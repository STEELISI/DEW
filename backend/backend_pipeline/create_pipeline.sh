echo "hi in create pipeline bash file"

VAR1=$1
VAR1_NAME="${VAR1}.py"
VAR1_NAME_SH="${VAR1}_rc"

monit_text='check program '${VAR1}' with path "/usr/bin/python3 /home/kishu/dew/'${VAR1_NAME}'"  with timeout 50 seconds  \
if status = 0 then exec  "/usr/bin/python3 /home/kishu/dew/tp1.py"  \
if status = 3 then exec  "/usr/bin/python3 /home/kishu/dew/tp2.py"  \';\

destdir=/etc/monit/$VAR1_NAME_SH
bash -c "touch '${destdir}'"
echo $monit_text
if [ -f "$destdir" ]
then
    echo "$monit_text" > "$destdir"
fi

bash -c "chmod 0700 /etc/monit/'${destdir}'"

bash -c "monit reload"
monitrc=/etc/monit/monitrc
echo "include /etc/monit/${VAR1_NAME_SH}" >> $monitrc