//==================================================== GOOGLE CLOUD ============================================================================

/* 
    Google cloud is a service that provides cloud computing. Google has a number of data centers around the globe, 
    these data centers have computers, disk drives and virtual resources that can be utilized by other developers to 
    build a website, software or server for their business or organization.

    In other words, if a small business wants to deploy a server for their company, they can use google cloud
    to host their servers, because google already has the hardware (in their data centers) required to maintain and contain servers
    Developers dont need their own physical hardware or computer to host the server 24/7 when they have google cloud.

*/





//================================================= GOOGLE CLOUD RUN ===========================================================================
/*
    Google cloud run is a service that is used to deploy websites and servers.
          
    1) Use Docker to create an image of your app (look at docker notes for more info)

    2) For windows only, download the google cloud CLI (https://cloud.google.com/sdk/docs/install)

        gcloud init

    3) For macOS only, run the following commands

        brew install google-cloud-sdk
        gcloud init

    3) gcloud auth login                    //login with google
    
    4) Run the following commands 
    
        docker tag name-of-image gcr.io/PROJECT_ID/name-of-image                    // you can get PROJECT_ID from the google console 
        docker push name-of-image gcr.io/PROJECT_ID/name-of-image
*/ 




  

