from django.db import models

City = (('TM', 'Tumen'), ('EK', 'Ekaterinburg'))


# Create your models here.
class markcoord(models.Model):
    xcord = models.FloatField(verbose_name='X coord')
    ycord = models.FloatField(verbose_name='Y coord')
    timecreate = models.DateTimeField(auto_now_add=True,)
    city = models.CharField(verbose_name='City', default=City[0], choices=City, max_length=200)
    hate_point = models.IntegerField(verbose_name="Hate Points", default=0)
    like_point = models.IntegerField(verbose_name="Like Points", default=0)

    def __str__(self):
        return self.city + " " + str(self.id) + " " + str(self.timecreate)
