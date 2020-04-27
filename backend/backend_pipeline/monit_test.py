from monit import Monit 

mon = Monit(username='admin', password='monit')

print(mon)


print(mon['nodea.test.dew.isi.deterlab.net'])