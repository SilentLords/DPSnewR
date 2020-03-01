from django.http import HttpResponseRedirect
from django.shortcuts import render, reverse
from .models import markcoord
import datetime
from .models import City


# Create your views here.
def main(request):
    if request.method == 'POST':
        # print(str(request.POST))
        # print('I have a post!')
        markx = request.POST.get("coordx")
        marky = request.POST.get("coordy")
        markcoord.objects.create(xcord=markx, ycord=marky, city=City[0])
        list_of_marks_cord = []
        list_of_marks = []
    else:
        allmarks = markcoord.objects.all()
        list_of_marks_cord = []
        list_of_marks = []

        for mark in allmarks:

            time = mark.timecreate.replace(tzinfo=None)
            dif = datetime.datetime.utcnow() - time
            # print(dif.total_seconds() // 3600)
            if dif.total_seconds() // 3600 >= 3:
                markcoord.objects.filter(id=mark.id).delete()
            else:
                list_of_marks_cord.append([mark.xcord, mark.ycord])
                list_of_marks.append([mark.id, mark.hate_point, mark.like_point])

    return render(request, 'index.html', {'marklist': list_of_marks, 'cord_List': list_of_marks_cord, "time": 300000})


def hate(request):
    ids = request.POST.get("hate_Id")
    hate_mark = markcoord.objects.get(id=ids)
    hate_mark.hate_point += 1
    hate_mark.save()
    return HttpResponseRedirect(reverse('map'))
