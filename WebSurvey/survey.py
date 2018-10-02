from os import path
from flask_wtf.file import FileField, FileRequired, FileAllowed
from flask_wtf.csrf import CsrfProtect
from flask_wtf import Form
from flask_uploads import TEXT, IMAGES, DOCUMENTS, DATA, SCRIPTS, ARCHIVES, UploadSet, configure_uploads
from flask import request
from werkzeug.utils import secure_filename
from flask import Flask, render_template, flash, request, redirect, url_for
from wtforms import TextField, SelectField, RadioField, TextAreaField, validators, StringField, SubmitField, FileField
 
# App config.
DEBUG = True
app = Flask(__name__)
app.config.from_object(__name__)
app.config['SECRET_KEY'] = '7d441f27d441f27567d441f2b6176a'
app.config['UPLOADS_DEFAULT_DEST'] = '/tmp'
app.config['UPLOAD_FOLDER'] = '/tmp/uploads'
files = UploadSet('files', TEXT + IMAGES + DOCUMENTS + DATA + SCRIPTS + ARCHIVES)  
configure_uploads(app, (files,))
CsrfProtect(app) 
 
class Hello(Form):
    nickName = TextField('Nick Name:', validators=[validators.required()])
    email = TextField('Email:')
 

class Background(Form):
    YearRangeMsg = 'Years of experience should be between 0 and 40'
    ExpRangeMsg = 'Number of experiments is limited to a number in the range of 0-1000'
    
    # Choices for expertise.
    valid_choices = ['novice', 'intermediate', 'expert']
    
    # Fields
    numdeteryears = TextField('How long have you used DETERLab?<br>(If it\'s been less than a year, put \"1\" year)', validators=[validators.required()]) 
    numdeterexps = TextField('How many experiments have you run on DETERLab?<br>(An estimate is fine)', validators=[validators.required()]) 
    deterExperience = RadioField('How would you rate your DETERLab experience level?', choices=[('novice', 'Novice'),('intermediate', 'Intermediate'),('expert', 'Expert')], default='novice') 
    numyears = TextField('How long have you used testbeds in general?<br>(e.g. Genie, Emulab etc.)', validators=[validators.required()]) 
    numexps = TextField('How many experiments have you run on testbeds?<br>(An estimate is fine)', validators=[validators.required()]) 
    testbedExperience = RadioField('How would you rate your general testbed experience level?', choices=[('novice', 'Novice'),('intermediate', 'Intermediate'),('expert', 'Expert')], default='novice') 
    
    def inYearRange(num):
        try:
            if int(num.data.strip()) >= 0 and int(num.data.strip()) <= 40:
                return True
        except:
            return False
            
    def inExpRange(num):
        try:
            if int(num.data.strip()) >= 0 and int(num.data.strip()) <= 1000:
                return True
        except:
            return False
            
    @staticmethod
    def validate_numdeteryears(form, field):
        print("Testing ", field)
        if not Background.inYearRange(field):
            raise validators.ValidationError(Background.YearRangeMsg)
            
    @staticmethod
    def validate_numyears(form, field):
        if not Background.inYearRange(field):
            raise validators.ValidationError(Background.YearRangeMsg)
    
    @staticmethod
    def validate_numdeterexps(form, field):
        if not Background.inExpRange(field):
            raise validators.ValidationError(Background.ExpRangeMsg)
    
    @staticmethod
    def validate_numexps(form, field):
        if not Background.inExpRange(field):
            raise validators.ValidationError(Background.ExpRangeMsg)

    @staticmethod
    def validate_deterExperience(form, field):
        Background.validate_testbedExperience(form, field)

    @staticmethod
    def validate_testbedExperience(form, field):
        if field.data not in Background.valid_choices:
            raise validators.ValidationError("Requires choice of %s but got %s" % (' '.join(Background.valid_choices), field.data))


class Description(Form):
    expIsClearOptions = [('select one', '<Select One>'), ('yes', 'Yes'), ('no', 'No'), ('somewhat', 'Somewhat')]
    firstStepOptions = [('select one', '<Select One>'), ('structFirst', 'Structure First'), ('behaviorFirst', 'Behavior First'), ('depends', 'Depends'), ('unsure', 'Unsure')]

    expIsClear = SelectField('Is the experiment description clear to you?', choices=expIsClearOptions)
    firstStepUsually = SelectField('When designing experiments for DETERLab<br> or other testbeds, do you usually start <br> with desigining the structure (topology/NS File etc.) <br>or<br> the behavior (the scripts and tools needed <br> to orchestrate the events in your experiment)?', choices=firstStepOptions)
    firstStepNow = SelectField('In designing the experiment described above, <br> would you start with designing the structure first, <br> or the behavior first?', choices=firstStepOptions)
    expComments = TextAreaField('Share any comments you have about the experiment description: (optional)')
     
    @staticmethod
    def validate_expIsClear(form, field):
        print("Validating %s is in options." % (field.data))
        if field.data not in [x[0] for x in Description.expIsClearOptions] or field.data == 'select one':
            raise validators.ValidationError("Requires choice.")
    
    @staticmethod
    def validate_firstStepUsually(form, field):
        print("VALIDATING")
        if field.data not in [x[0] for x in Description.firstStepOptions] or field.data == 'select one':
            raise validators.ValidationError("Requires choice.")
    
    @staticmethod
    def validate_firstStepNow(form, field):
        Description.validate_firstStepUsually(form, field) 
     
     
class NSForm(Form):
    nsskel = """#Simulation Declaration
set ns [new Simulator]
source tb_compat.tcl

# ENTER YOUR SPECIFICATION BELOW:


# Routing
$ns rtproto Session

#Start experiment
$ns run
"""
    nsfile = TextAreaField("To the best of your abliity,<br> please write an  NS file to set up <br> the DETERLab topology for the above experiment.", default=nsskel)    
    nstools = TextAreaField("Please specify any tools you used<br> to help you write the above NS File.<br> (e.g. DETER's web interface for NS File syntax checking)")
    
    @staticmethod
    def validate_nsfile(form, field):
        print("CHECKING IF NSFILE DATA: \"%s\" IS THE SAME AS: \"%s\"" %(field.data, NSForm.nsskel))
        if "".join(field.data.split()) == "".join(NSForm.nsskel.split()):
            #print("IT IS THE SAME")
            raise validators.ValidationError('Error: Please supply something beyond the given NS file lines.')
        else:
            print("not the same")

class NSFormScaled(Form):
    nsfile = TextAreaField("Next please modify your NSFile <br>to specify having <b>four<b> \"Machine Z\"s instead of a single Machine Z.")    
    
    @staticmethod
    def validate_nsfile(form, field):
        if "".join(field.data.split()) == "".join(NSForm.nsskel.split()):
            #print("IT IS THE SAME")
            raise validators.ValidationError('Error: Please modify your NS File to specify 3 more physical nodes.')
        else:
            print("not the same")


class Scripts(Form):
    scripts = FileField('Upload your script files - you can choose and upload multiple files at a time.', validators=[FileRequired(), FileAllowed(files, 'Only Text (*.%s), images (*.%s), documents (*.%s), archives (*.%s), scripts (*.%s) and data (*.%s) types allowed.' % (",*".join(TEXT), ",*".join(IMAGES), ",*.".join(DOCUMENTS), ",*.".join(DATA), ",*.".join(SCRIPTS), ",*.".join(ARCHIVES)))])
class Tools(Form):
    tooldescription = TextAreaField("Description of your orchestration, scripting and tooling.", validators=[validators.required()])
class Dew(Form):
    pass
class DewResult(Form):
    nsfile = FileField('Upload the UI produced NS file.', validators=[FileRequired(), FileAllowed('ns', 'Only an NS file is allowed.')])
    script = FileField('Upload the UI produced bash script.', validators=[FileRequired(), FileAllowed(SCRIPTS, 'Only a script file is allowed.')])
    inputSummary = FileField('Upload the UIInput.txt file.', validators=[FileRequired(), FileAllowed(TEXT, 'Only a text file is allowed.')])
class Feedback(Form):
    meetNeeds = SelectField('In creating the NS File for the simple set up we gave you, was the UI useful to you?', choices=[('select one', '<Select One>'),('not at all', 'No, not at all'),('somewhat', 'Somewhat'),('mostly','Mostly'),('yes','Yes')])    
    goodFeatures = TextAreaField("Which features were the most useful?", validators=[validators.required()])
    badFeatures = TextAreaField("Which features were the least useful?", validators=[validators.required()])
    futureFeatures = TextAreaField("Which features would you like to see developed in the future?", validators=[validators.required()])
    comments = TextAreaField("Optionally, please leave any additional feedback you may have:")

@app.route("/", methods=['GET', 'POST'])
def hello():
    """Get basic name/email info if shared."""
    form = Hello(request.form)
 
    print(form.errors)
    if request.method == 'POST':
        name=request.form['nickName']
        email=request.form['email']
        print(name, " ", email, " ")
        #print(request.form)
 
        #form = Hello(request.form)
        
        if form.validate():
            # Save the comment here.
            #flash('Thanks for registration ' + name)
            return redirect(url_for('background', contributor=name))
        else:
            for fieldName, errorMessages in form.errors.items():
                for err in errorMessages:
                    flash('Error: %s: %s' % (fieldName, err))
 
    return render_template('hello.html', form=form)


@app.route("/1/<contributor>", methods=['GET', 'POST'])
def background(contributor):
    """Get user's background and expertise in testbeds."""
    form = Background(request.form)
    print(form.errors)
    if request.method == 'POST':
        numdeteryears = request.form['numdeteryears']
        numdeterexps = request.form['numdeterexps']
        deterExperience = request.form['deterExperience']
        numTestbedyears = request.form['numyears']
        numexps = request.form['numexps']
        testbedExperience = request.form['testbedExperience']
               
        if form.validate():
            return redirect(url_for('description', contributor=contributor))
        else:
            for fieldName, errorMessages in form.errors.items():
                for err in errorMessages:
                    flash('Error for %s: %s' %(fieldName, err))
    
    return render_template('background.html', form=form)

@app.route("/2/<contributor>", methods=['GET', 'POST'])
def description(contributor):
    """Give experiment description, ask user to summarizse the goal of the experiment."""
    """Ask user if they would create an NS file first, or put together scripts to run experiment first."""
    form = Description(request.form)
    print(form.errors)
    nsFirst = False
    if request.method == 'POST':
        expIsClear = request.form['expIsClear']
        firstStepNow = request.form['firstStepNow']
        if firstStepNow == 'structFirst':
            nsFirst = True 
    
        if form.validate():
            if nsFirst:
                return redirect(url_for('nsFromScratch', contributor=contributor, structureFirst=nsFirst))
            else:
                return redirect(url_for('toolsFromScratch', contributor=contributor, structureFirst=nsFirst))
        else:
            for fieldName, errorMessages in form.errors.items():
                for err in errorMessages:
                    flash('Error for %s: %s' %(fieldName, err))
            
    return render_template('description.html', form=form)

@app.route("/3ns/<contributor>", methods=['GET', 'POST'])
def nsFromScratch(contributor, scale='1', structureFirst=True):
    """NS File from scratch using {scale} attackers."""
    form = NSForm(request.form)
    print(form.errors)
    if request.method == 'POST':
        if form.validate():
            ## Ask them to scale up if we haven't already.
            ##return redirect(url_for('nsFromScratchWScale', method="GET", contributor=contributor, scale='4', structureFirst=request.args['structureFirst'], nsfile=request.form['nsfile']))
            if request.args['structureFirst'] == 'True':
                # We haven't done tools yet.
                return redirect(url_for('toolsFromScratch', contributor=contributor, structureFirst=request.args['structureFirst']))
            else:
                # We have done tools, so do scaling.
                return redirect(url_for('nsFromScratchWScale', method="GET", contributor=contributor, scale='4', structureFirst=request.args['structureFirst'], nsfile=request.form['nsfile']))
        else:	
            for fieldName, errorMessages in form.errors.items():
                for err in errorMessages:
                    print(err)
                    flash('Error for %s: %s' % (fieldName, err))
             
    return render_template('ns.html', form=form, scale=scale)

@app.route("/3ns-scale/<contributor>", methods=['GET', 'POST'])
def nsFromScratchWScale(contributor, scale='4', structureFirst=True, nsfile=''):
    """NS File from scratch using {scale} attackers."""
    form = NSFormScaled(request.form)
    if len(request.form) == 0:
        form.nsfile.default = request.args['nsfile']
        form.process()
    if request.method == 'POST':
        if form.validate():
            # Ask them to scale up if we haven't already.
            #if request.args['structureFirst'] == 'True':
                # Now do behavior.
            #    return redirect(url_for('toolsFromScratch', contributor=contributor, structureFirst=request.args['structureFirst']))
            #else:
            return(url_for('dew', contributor=contributor))
        else:   
            for fieldName, errorMessages in form.errors.items():
                for err in errorMessages:
                    print(err)
                    flash('Error for %s: %s' % (fieldName, err))

    return render_template('ns.html', form=form, scale=scale, structureFirst=request.args['structureFirst'])


@app.route("/3tools/<contributor>", methods=['GET', 'POST'])
def toolsFromScratch(contributor):
    """Have users list the scripts/tools they would use to test their defence and orchestrate experiment."""    
    ToolsForm = Tools(request.form)
    ScriptsForm = Scripts()
    print(ToolsForm.errors)
    print(ScriptsForm.errors)
    if request.method == 'POST':
        print(request.form)
        uploaded_files = request.files.getlist("scripts")
        
        # Have updated list of files that were uploaded? Will require some javascript.
        if 'upload' in request.form and request.form['upload'] == "UploadFile" and ScriptsForm.validate_on_submit():
            print(request.form['upload'])
            #uploaded_files = request.files.getlist("scripts")
            print("Files uploaded: ", uploaded_files, " Script validate errors", ScriptsForm.errors.items())
            for file in uploaded_files:
                if file.filename == '':
                    print("Empty file name.")
                else:
                    newfilename = secure_filename(file.filename)
                    file.save(path.join(app.config['UPLOAD_FOLDER'], contributor+"."+newfilename))
                    

        elif ToolsForm.validate(): 
            if request.args['structureFirst'] == 'False':
                return redirect(url_for('nsFromScratch', contributor=contributor, structureFirst=request.args['structureFirst']))
            else:
                return redirect(url_for('nsFromScratchWScale', method="GET", contributor=contributor, scale='4', structureFirst=request.args['structureFirst'], nsfile=request.form['nsfile']))
        else:
            for fieldName, errorMessages in ScriptsForm.errors.items():
                for err in errorMessages:
                    flash('Error: %s: %s' % (fieldName, err))
            for fieldName, errorMessages in ToolsForm.errors.items():
                for err in errorMessages:
                    flash('Error: %s: %s' % (fieldName, err))

    
    return render_template('tools.html', ScriptsForm=ScriptsForm, ToolsForm=ToolsForm, structureFirst=request.args['structureFirst'])

@app.route("/4/<contributor>", methods=['GET', 'POST'])
def dew(contributor):
    """Download DEW, describe DEW features"""
    form = Dew(request.form)
    if request.method == 'POST':
        if form.validate():
            # Ask them to scale up if we haven't already.
            #if request.args['structureFirst'] == 'True':
                # Now do behavior.
            #    return redirect(url_for('toolsFromScratch', contributor=contributor, structureFirst=request.args['structureFirst']))
            #else:
            return(url_for('dewresult', contributor=contributor))
        else:   
            for fieldName, errorMessages in form.errors.items():
                for err in errorMessages:
                    print(err)
                    flash('Error for %s: %s' % (fieldName, err))

    return render_template('dew.html', form=form)

@app.route("/5/<contributor>", methods=['GET', 'POST'])
def dewresult(contributor):
    """NS file from DEW/UI, NLP and HLB behavior."""
    form = DewResult(request.form)
    print(form.errors)
    if request.method == 'POST':   
        if form.validate():
            return redirect(url_for('description', contributor=name))
        else:
            for fieldName, errorMessages in form.errors.items():
                for err in errorMessages:
                    print(err)
                    flash('Error for %s: %s' % (fieldName, err))
    
    return(url_for('feedback', contributor=contributor))

@app.route("/6/<contributor>", methods=['GET', 'POST'])
def feedback(contributor):
    """Feedback"""
    form = Feedback(request.form)
    #print(form.errors)
    #if request.method == 'POST':
    #    expertiseLevel = request.form['expertiseLevel']
    
    #if form.validate():
    #    return redirect(url_for('description', contributor=name))
    
    return(url_for('thankyou', contributor=contributor))

@app.route("/ThankYou/<contributor>", methods=['GET', 'POST'])
def thankyou(contributor):
    """End"""
    #form = ReusableForm(request.form)
    #print(form.errors)
    #if request.method == 'POST':
    #    expertiseLevel = request.form['expertiseLevel']
    
    #if form.validate():
    #    return redirect(url_for('description', contributor=name))
    
    return("Hello %s" % contributor)
    
    

if __name__ == "__main__":
    app.run()

