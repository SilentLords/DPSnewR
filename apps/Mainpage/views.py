from django.shortcuts import render
from .models import markcoord
import datetime
from .models import City
# Create your views here.
def main(request):
    return render(request, 'dps.html')


def tmn(request):
    if request.method == 'POST':
        # print(str(request.POST))
        print('I have a post!')
        markx = request.POST.get("coordx")
        marky = request.POST.get("coordy")
        markcoord.objects.create(xcord=markx, ycord=marky,city=City[0])
        list_of_marks = []
        # print(markcoord.objects.all())
    else:
        allmarks = markcoord.objects.filter(city=City[0])
        list_of_marks = []
        for mark in allmarks:

            time = mark.timecreate.replace(tzinfo=None)
            dif = datetime.datetime.now() - time
            if dif.total_seconds() // 3600 > 3:
                markcoord.objects.filter(id = mark.id).delete()
                # markcoord.save()
            else:
                obj = [mark.xcord, mark.ycord]
                list_of_marks.append(obj)
        print(list_of_marks)
    return render(request, 'tmn.dps.html', {'marklist':list_of_marks})


def ekb(request):
    if request.method == 'POST':
        # print(str(request.POST))
        print('I have a post!')
        markx = request.POST.get("coordx")
        marky = request.POST.get("coordy")
        markcoord.objects.create(xcord=markx, ycord=marky,city=City[1])
        list_of_marks = []
        # print(markcoord.objects.all())
    else:
        allmarks = markcoord.objects.filter(city=City[1])
        list_of_marks = []
        for mark in allmarks:

            time = mark.timecreate.replace(tzinfo=None)
            dif = datetime.datetime.now() - time
            if dif.total_seconds() // 3600 > 3:
                markcoord.objects.filter(id=mark.id).delete()
                # markcoord.save()
            else:
                obj = [mark.xcord, mark.ycord]
                list_of_marks.append(obj)
        print(list_of_marks)
    return render(request, 'ekb.dps.html', {'marklist': list_of_marks})
