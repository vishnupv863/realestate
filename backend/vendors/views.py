from django.shortcuts import render


def vendor_list(request):
    return render(request, "vendors/vendor_list.html")
