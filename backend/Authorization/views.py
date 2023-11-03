from django.shortcuts import render
from django.shortcuts import redirect
from oauth2client.client import OAuth2WebServerFlow
from oauth2client.client import flow_from_clientsecrets
from oauth2client.file import Storage
from django.http import JsonResponse

def google_drive_auth(request):
    flow = OAuth2WebServerFlow(
        client_id='598868702408-8gl46dfh8cdgh0lenmoeepri8l9340cs.apps.googleusercontent.com',
        client_secret='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',
        scope='https://www.googleapis.com/auth/drive',
        redirect_uri='http://localhost:8000/google_drive_callback'
    )
    auth_uri = flow.step1_get_authorize_url()
    return redirect(auth_uri)

def google_drive_callback(request):
    flow = OAuth2WebServerFlow(
        client_id='598868702408-8gl46dfh8cdgh0lenmoeepri8l9340cs.apps.googleusercontent.com',
        client_secret='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',
        scope='https://www.googleapis.com/auth/drive',
        redirect_uri='http://localhost:8000/google_drive_callback'
    )
    credentials = flow.step2_exchange(request.GET)
    storage = Storage('google_drive_credentials.dat')
    storage.put(credentials)
    return redirect('https://www.google.com')

