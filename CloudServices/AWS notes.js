//====================================================== CLOUD COMPUTING ===========================================================================
/* 
    Cloud computing is the on-demand delivery of IT resources via the internet. Instead of owning expensive hardware that manages servers and databases, 
    you can access technology services (storage, databases, computing power) on an as-needed basis from a cloud provider (AWS)

*/
















//========================================================== AMAZON S3 =================================================================================

/*
        Amazon Web Services S3 is an 'object' storage service that can be used to store data such as any type of files (text, image, video, etc...) and folders
        
        S3 is basically a NoSQL database
        S3 also has a REST API that is used by the back-end to make requests and receive responses from a bucket
        S3 is mostly used for backup and storage. Useful for saving distinct copies of you data
        S3 can also be used to host/deploy a static website
        
        S3 uses Buckets and Objects. Buckets are containers for objects, and objects are files or any metadata that describes the file.
        
        --Buckets consists of objects that are each identified by a key and a version ID (if S3 versioning is enabled on the bucket)
        
        --Objects consist of object data and metadata
        
            metadata: a set of name and value pairs that describes the object, some of these pairs are default sets such as 'date last modified', and standard HTTP metadata (Content-Type)
                    
            object data: can be any type of file; text, js, css, image, video, literally any file
*/            
        
        


// ------------------------------------------ HOW TO USE S3 AS A DATABASE WITH THE SDK -----------------------------------------------------------------------    
/*        
        You will need to use the AWS-S3 SDK to use an S3 bucket on your application
        
        1) Create a bucket in s3 console
        
        2) set the following options for the bucket
            --ACL's enabled                                (in case you miss this part, you can go to 'Permissions', and then to 'Object Ownership', then click on ACL's enabled)
            --unblock all public access                    (in case you miss this part, you can go to 'Permissions', then to 'Block Public Access', then uncheck 'Block all public access' )
            Then click on create bucket
            
        3) Go to Permissions and then click on 'Edit' in Bucket Policy
        
        4) Copy the 'Bucket ARN' and then click on 'Policy Generator'
        
        5) Set the settings below...
        
            --type of policy: S3 Bucket Policy
            --Principal: *
            --Actions: GetObject, PutObject
            --Paste the Bucket ARN and then type '/*' next to it
            Then click on Add Statement and then Generate Policy (copy the JSON code that pops up)
            
        6) Go back to Permissions -> Bucket Policy -> edit -> paste the policy and then click Save
        
        7) Then go to Permissions and then scroll down to CORS and paste the following.... 
            (this will allow any/specific origin to make ajax calls to s3
            
                [
                    {
                        "AllowedHeaders": [
                                "*"
                            ],
                        "AllowedMethods": [
                                "PUT",
                                "HEAD",
                                "GET"
                            ],
                        "AllowedOrigins": [
                            "*"
                        ],
                        "ExposeHeaders": []
                    }
                ]
        
        
        8) Now you need to create or use an 'IAM' user that has an 'access key id' and a 'secret access key' 
            and also a policy that allows that user to access the S3 bucket
        
        9) You can either select an policy that already exists and gives full access to ALL s3 buckets, if so, skip to step 10
             if you want a policy that has limited access to some s3 buckets, then proceed to the next step
        
            9.a) Go to 'IAM console' and then click 'Policies', then click on 'Create Policy', then set the following options...
            
                --select S3
                --click on Write and select PutObject (this action lets the user put objects into the database)
                --click on Read and select GetObject (this action lets the user get objects from the database)
                --Go To resources, Then click on Add ARN 
                    --Then type in the ARN of the s3 bucket and click on 'Any object name'
                Then click on 'Add ARN'
                
            9.b) Give a name to the policy and create it (remember the name of the policy)
        
        10) Now you need to assign that policy to the IAM user, To do this, go back to 'IAM console' and click on 'Users'
        
        11) Select the user, and then click on 'Add Permissions', then click on 'Attack policies directly' and search for the policy that you just created
        
        12) finally, click on next and then on Add Permissions
        
        13) Your IAM user is now ready to access the S3 bucket
        
        14) Create a file 'S3.js' with the following lines of code...
*/


// ------------------------------------------ Initializing the AWS-SDK        

        import aws from 'aws-sdk';
        
        const s3 = new aws.S3({
            region: 'us-west-1',
            accessKeyId: '',
            secretAccessKey: '',
            signatureVersion: 'v4'
        })


            

// ------------------------------------------ Storing objects into an S3 bucket
/* 
    You can store objects in an s3 bucket with the putObject() method
*/

            async function PutObject (objectName, data) {
                const params = {
                      Bucket: 'your-bucket-name',
                      Key: objectName,                   
                      Body: JSON.stringify(data)
                };
                
                const result = await s3.putObject(params).promise();    
            }




// ------------------------------------------ Uploading files into an S3 bucket
/* 
    You can upload files into an s3 bucket with the upload() method
*/

            export function UploadFile (file) {        //file must be from <input type='file'>
                
                const params = {
                  Bucket: 'your-bucket-name',
                  Key: file.name,
                  Body: file
                };
                
                const result = await s3.upload(params).promise()
            }




// ------------------------------------------ Getting objects from an S3 bucket
/* 
    You can get objects from an S3 bucket with the .getObject() method.
    Keep in mind that this method will return a buffer, so you need to 
    convert the buffer into a UTF-8 encoded string.
*/

            export function GetObject (objectName) {
                const params = {
                      Bucket: 'your-bucket-name',
                      Key: objectName
                    };
                
                const data = await s3.getObject(params).promise();
                const JSON_object = data.Body.toString("utf-8")
                const object = JSON.parse(JSON_object);
            }





// ------------------------------------------ Deleting objects from an S3 bucket
/* 
    You can delete an object from an s3 bucket by using the deleteObject() method
*/

            export function DeleteObject (objectName) {
                const params = {
                      Bucket: 'your-bucket-name',
                      Key: objectName
                };

                const otherParams = {                                    //you can delete multiple objects from the s3 bucket with these params
                      Bucket: 'your-bucket-name',
                      Delete: {
                        Objects: [
                          { Key: 'example1.txt' },
                          { Key: 'example2.txt' }
                        ]
                      }
                    };
                
                const result = await s3.deleteObject(params).promise();
            }





// ------------------------------------------ Getting meta-data from ALL objects in an S3 bucket
/* 
    You can get the meta data of all objects from an S3 bucket by using the listObjectV2() method.
    Keep in mind that this method does not return the actual data from the s3 bucket
    
*/
            export function GetAllObjects (bucketName)  {
                const params = {
                      Bucket: bucketName
                };
                
                const objects = await s3.listObjectsV2(params).promise();
                objects.content;            //array of objects containing meta data about the objects in s3
                /* 
                      Contents =  [
                        {
                          "Key": "user.json",
                          "LastModified": "2025-05-13T23:37:00.000Z",
                          "Size": 24,
                          "ETag": "\"abc123def456ghi789\"",
                          "StorageClass": "STANDARD"
                        }
                      ]                
                */
            }


// ------------------------------------------ getSignedUrlPromise() 
/* 
    This method returns a promise that has a pre-signed URL that can be used in a 
    fetch request to perform the CRUD operation

        CRUD operations:
    
            putObject
            getObject
            deleteObject
*/

const params = {
    Bucket: 'your-bucket-name',
    Key: 'name of object',
    Expires: 60
};

s3.getSignedUrlPromise('putObject', params).then((URL) => {
    fetch(url, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({data: 'data'}),
    })
})



// ------------------------------------------ getSignedUrl()
/* 
    This method accepts a callback on the third argument that has a pre-signed URL that
    can be used in a fetch request to perform the CRUD operation

            CRUD operations:
    
                putObject
                getObject
                deleteObject
*/

const params = {
    Bucket: 'your-bucket-name',
    Key: 'name of object',
    Expires: 60
};

s3.getSignedUrl('putObject', params, (err, url) => {
    if(err) return;
    
    fetch(url, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({data: 'data'}),
    })
})

            
// ------------------------------------------ createPresignedPost()
/* 
    This method will return a pre-signed URL that can be used inside a form to make a POST
    request. You can upload the files from a form into the S3 bucket. 
    Keep in mind that the form using the pre-signed url must only have files.
    you cannot upload any text data from the form.
*/


    const params = {
      Bucket: "your-bucket-name",
      Fields: {
        Key: "your-file-key",
        ContentType: "image/png",
      },
    };

    s3.createPresignedPost(params, (error, data) => {
            data = {
                 url: "https://your-bucket.s3.amazonaws.com/",
                 fields: {
                     key: "your-file-key",
                     AWSAccessKeyId: "AKIAEXAMPLE",
                     policy: "base64-encoded-policy",
                     signature: "generated-signature"
                  }
            }
    })


    <form action={url} encType="multipart/form-data" method='post'}>                           
        <input type="hidden" name="key" value={fields.key}>
        <input type="hidden" name="AWSAccessKeyId" value={fields.AWSAccessKeyId}>
        <input type="hidden" name="policy" value={fields.policy}>
        <input type="hidden" name="signature" value={fields.signature}>         
        <input type='file' name='file'/>
        <input type='submit'/>
    </form>






        

//--------------------------------------------HOW TO MANUALLY DEPLOY A WEBSITE WITH S3----------------------------------------------------------------------

/*
    1) Create a bucket in S3 console
    
    2) set the following options for the bucket
        --ACL's enabled                                (in case you miss this part, you can go to 'Permissions', and then to 'Object Ownership', then click on ACL's enabled)
        --unblock all public access                    (in case you miss this part, you can go to 'Permissions', then to 'Block Public Access', then uncheck 'Block all public access' )
        Then click on create bucket
        
    3) Go to properties and then click on STATIC WEBSITE HOSTING and enable static website hosting for the bucket
    
    4) Go to Permissions and then click on 'Edit' in Bucket Policy
    
    5) Copy the 'Bucket ARN' and then click on 'Policy Generator'
    
    6) Set the settings below...
    
        --type of policy: S3 Bucket Policy
        --Principal: *
        --Actions: GetObject
        --Paste the Bucket ARN and then type '/*' next to it
        Then click on Add Statement and then Generate Policy (copy the JSON code that pops up)
        
    7) Go back to Permissions -> Bucket Policy -> edit -> paste the policy and then click Save
    
    8) Now all you have to do is import all the files in the /dist folder to the bucket (not the folder itself)
    
        you can also use the command line instead.. aws s3 sync ./dist s3://{name-of-bucket}
    
    9) Select all the files that you imported in the bucket and then click on 'Actions', and then click on 'Make public using ACL'  
    
    10) once everything is working properly, go back to properties and scroll all the way down and click on the link in static website hosting


*/


//------------------------------------------------HOW TO CONNECT A GITHUB REPOSITORY TO S3------------------------------------------------------------
/*
    1) Create an S3 Bucket 

    2) set these settings on the bucket
        --ACL's enabled                                (in case you miss this part, you can go to 'Permissions', and then to 'Object Ownership', then click on ACL's enabled)
        --unblock all public access                    (in case you miss this part, you can go to 'Permissions', then to 'Block Public Access', then uncheck 'Block all public access' )

    3) Go to Permissions and click on 'Edit' in Bucket policy, then copy the Bucket ARN
       Then click on Policy Generator and set the following options...
       
        --type of policy: S3 Bucket Policy
        --Principal: *
        --Actions: All
        --Paste the Bucket ARN and then type '/*' next to it
        Then click on Add Statement and then Generate Policy (copy the JSON code that pops up)
        
    4)  Go back to Permissions -> Bucket Policy -> edit -> paste the policy and then click Save

    5) Then go to 'Properties' and then STATIC WEBSITE HOSTING, and enable static website hosting

    6) Open up AWS CodePipeline

    7) Create a pipeline with these settings

        step 1)
            --pipeline type: V1 
            --Create or use an existing role and check 'Allow AWS codePipeline to create a service role....'
            --Advanced Settings: check Custom locations and Default AWS managed Key
            
        step 2)
            --Source Provider: Github Version 2
            --Connect to Github
            --Select repository
            --push in a branch
            --speciify 'main' as the branch name
            --check CodePipeline Default
            
        step 3)
            --Select AWS CodeBuild
            --Click on Create project (this will create a project in AWS CodeBuild)
            --Click on managed image
            --for operating system, select amazon linux
            --for runtime, select standard
            --for image, select 'aws/codebuild/amazonlinux2-x86_64-standard:5.0'
            --check 'use a buildspec file' (go to 'buildspec.yml' notes for more details).... this part is essential!!
            Then click on save
            
        step 4)
            -- Select Amazon S3
            -- Select a bucket that will host the static website
            -- click on Extract file before deploy

        8) Then on the next page, click on Create Pipeline

        9) IF everything went as planned, then the S3 bucket you created before should have hosted the static website 
           and any changes made to the github repository will be displayed to the S3 bucket
*/

























//=============================================== AMAZON EC2 INSTANCE ==============================================================
/* 
    Amazon EC2 instance is a service that launches/deploys virtual servers in the cloud. An instance is an individual server
    in the cloud. You can deploy node.js with EC2 instance
    




//------------------------------------------------ DEPLOYING A NODE.JS APP WITH EC2 ------------------------------------------------------------

    1)  Go to EC2 dashboard and click on Launch Instance

    2)  Create a name for the server
        
    3)  Select an Amazon Machine Image (template for software configuration for the machine that will run your server) 
        
    4)  Select instance type (template for hardware configuration for the machine that will run your server)
        
    5)  Create a key pair and save the file in desktop so that you can connect securely to the server
          
    6)  In Network settings, check 'Allow HTTPS traffic from the internet'
        
    7)  Configure Storage section (template for the physical storage needed for the server)

    8)  Launch Instance

    9)  Connect to the instance by clicking on connect

    10) It will open up a terminal

    11) run the following commands

        // Install NVM (node version manager) first line takes you to the root directory, second installs NVM
            sudo su -                                        
            curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash

        // Activate NVM
            . ~/.nvm/nvm.sh

        // Install node
            nvm install node

        //Check if node is install correctly
            node -v
            npm -v

        //Install git
            sudo apt-get update -y                    //replace apt-get with yum for linux based AMI
            sudo apt-get install git -y               //replace apt-get with yum for linux based AMI

        //Verify git is installed
            git version

        //Clone the repository that has the server
            git clone https://github.com/AbelMuro/Contact-form-server            //replace with actual repo

        //Change into the directory of the repo
            cd Contact-form-server

        //Install dependencies
            npm install

        //Run node.js
            npm start

      12) To enable fetch request to the ec2 instance, you must configure the SecurityGroup for the instance

      13) Click on the instance -> security tab -> security groups.
          edit outbound rules
              add a rule for type 'All traffic' and destination for 'Anywhere IPv4'
          edit inbound rules
              add a rule for type 'http' and destination for 'Anywhere IPv4'
              add a rule for type 'https' and destination for 'Anywhere IPv4'
              add a rule for type 'SSH' and destination for 'Anywhere IPv4'

      14) Get the public IP or DNS of the instance by clicking on the instance, go to details tab and look for “Public IPv4 address” or "Public IPv4 DNS"

      15) In the fetch request, make the request to this url 'http://<public-ip-or-dns>/your-endpoint'

              If you server is running on a port that is not one of the default values (80 for http, or 443 for https)
              then the url should look like this url 'http://your-ec2-public-ip-or-dns:port/your-endpoint'

      16) To enable HTTPS requests to your ec2 instance, run the following commands

         16.1)  sudo yum install -y nginx                        //installs nginx                        in case you dont have nginx installed
         16.2)  sudo systemctl start nginx                       //starts nginx
         16.3)  sudo systemctl enable nginx                      //enables nginx to start on reboot
         16.4)  sudo nano /etc/nginx/sites-available/default     //configuration file for nginx
                    //paste the following lines of code
            
                server {
                    listen 80;
                    server_name example.com;                    //Use the url of your ec2 instance (https://ec2-52-53-169-169.us-west-1.compute.amazonaws.com/)
                
                    location / {
                        proxy_pass http://localhost:3000;        //make sure to replace 3000 with the actual port your node.js is running on
                        proxy_set_header Host $host;
                        proxy_set_header X-Real-IP $remote_addr;
                    }
                }

        16.5) sudo apt install certbot python3-certbot-nginx        //installing certbot

        16.6) sudo certbot --nginx -d example.com                   //creating SSL certificate, replace example.com with the url of your ec2 instance (https://ec2-52-53-169-169.us-west-1.compute.amazonaws.com/)

        16.7) Ensure that your nginx config file looks like this

                server {
                    listen 443 ssl;
                    server_name example.com;
                
                    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
                    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
                
                    location / {
                        proxy_pass http://localhost:3000;
                        proxy_set_header Host $host;
                        proxy_set_header X-Real-IP $remote_addr;
                    }
                }
                
                server {
                    listen 80;
                    server_name example.com;
                    return 301 https://$host$request_uri;
                }
    
        16.8) sudo systemctl restart nginx                        //restart nginx to apply the changes





          a) Keep in mind that npm start will start the server at a specific port, 
              if you want to close the server in that port then run the following commands
    
              sudo lsof -i :4000        //get the process ID
              sudo kill -9 <PID>        //replace <PID> with the process ID, this will terminate the process in the port
    
          b) If your server relies on env variables, then run the following commands
            
                nano .env            //creates an env file in current directory
                apiKey=123456789     //start entering the env variables

        c) if you have made changes to your remote repository, you will have to close the server and run the following command

                git pull







//--------------------------------------------------------- PM2 ------------------------------------------------------------------------------------------
 PM2 is a process manager that will enable you to easily manage different node.js apps with EC2

            npm install pm2@latest -g
            pm2 start server.js            //this will start the node.js app
            


























//================================================== AMAZON IAM =========================================================================

/* 
    Amazon IAM is a service that controls which users have authorization to use specific resources in AWS. The idea behind 
    these IAM users is to enable other people within an organization to use the same AWS account and its services. As the organization grows, 
    you can put IAM users within IAM groups that have the same permissions, thereby simplifying the permissions being delegated.

    When you create a AWS account, you are given a 'root' user account that has ALL administrative access. However, 
    it is strongly recommended to not use this root account for everyday tasks for security reasons. The Root user should 
    only be used for actions that require the root user. For other trivial actions, an IAM account should be used
    
    By default, an IAM user doesnt have any permissions. The root user will have to assign a 'policy' that lists 
    the permissions to the IAM user. Once the IAM user has the policy, they can access the AWS resources. Policies are basically JSON files
    
    Policies can also be assigned to Roles. Roles were designed to give temporary access to an IAM user to a resource that they 
    normally dont have permission for. If an IAM user doesn't have permission to access a bucket in S3, they can use a 'Role' to gain 
    temporary access to that bucket, but the Role must have the policy that gives permission to that bucket. Keep in mind that during the
    time the IAM user has a Role, they give up their previous policy temporarily.


    RECAP:
        Root user: the owner of the AWS account, they have all the administatrive access

        IAM user: a user of the AWS account, they must be given permission to use AWS resources

        Policies: are a list of permissions (access to S3, EC2, etc...) that are assigned to a IAM user or Role 

        Roles: are a list of policies that can be assigned to a user

        User Groups: are a group of users that share policies

 */


//------------------------------------------ How to create a 'role' and add a policy----------------------------------------------------
//Roles are a set of permissions that enable IAM users to access AWS resources


/* 

    0.5) If you have already created a Role, the you can simply just click on 'Add Permissions' button 
         and add the services that will be used by this role

    1) If you haven't created a role yet, you must do that first. 
       Go to the IAM management console

    2) Then click on Roles on the left side

    3) Click on 'Create Role' button

    4) On the 'Trusted Entity Type' section, select the entity type, (AWS account is the most popular one here)
       then click next

    5) Then select the AWS resources that will be permitted in this role, then click next

    6) Choose a name and description for the role

    7) then click Create Role 

    8) To add users to the role, first go to Roles -> select the role -> Trust Relationships -> Edit trust policy
        //remove any other property within the "Principal" property except "AWS"
            
        "Principal": {
            "AWS": ["arn:aws:iam::{ACCOUNT_ID_WITHOUT_HYPHENS}:user/Abel-Muro"]                    //you can add as many users as you want like this
        },    
                    

*/
















//================================================= AMAZON COGNITO ==========================================================================

//Amazon Cognito is a service that provides a way to authorize the users of your app/website. The users can sign in directly with a username and password,
//or they can use a third party identity provider like Amazon, Google, Facebook, Apple, etc..
//This is very similar to Firebase Authentication

//Amazon Cognito lets you create the following 'pools' of users in your AWS account.

/*
    USER POOLS: user pools are for identity verification(authentication). The users of your app can sign in/up directly with a username and password,
        or they can log in with a social identity provider like Amazon, Google, Facebook, Apple, etc..
*/

/*
    IDENTITY POOLS: identity pools provide temporary credentials to unauthorized users to access AWS resources.
        when an identity pool is created, two IAM roles are created in IAM management console and IAM identity provider.
        One role is for authorized users, and the other is for unauthorized users.
        You can assign a policy to each of these roles. Keep in mind that if you dont assign
        a policy for these roles, then even the authenticated users wont be able to acces any AWS resources
*/

//-------------------------------------------------- How to create an identity pool ---------------------------------------------------------

/* 
    1) open up Amazon Cognito console
    
    2) Click on Federated Identities on the top left

    3) click on Create new Identity pool button
    
    4) Choose a name for the identity pool
    
    5) Click on 'Enable access to unauthenticated identities'
    
    6) In the Authentication Providers section, you can include federated identity providers (optional)
    
    7) click on Create Pool
    
    8) Then you can name the two roles that will be created with the identity pool, its essential that you remember these names
    
    9) This will create two AWS identity roles and two AWS access management roles. One role for authorized users 
    and the other for unauthorized users. What you want to do now is set the permissions for the roles
    
    10) For the unauthorized role, you can add permissions by going to the IAM console and clicking on Roles on the left side
    
    11) then click on the unauthorized role that you created with the identity pool.
    
    12) click on Add Permissions button
    
    13) Add the permissions of the AWS resourse that you want your guests to use
    
*/


//---------------------------------------- Using an identity pool to allow guest users to use AWS resources -----------------------------------------
/* 
    1) Go back to Amazon Cognito console and click on the identity pool that you created
    
    2) Then click on sample code and copy the region ID and the identity pool ID
   
    3) Use the following code...
    
    4) keep in mind that Amazon Cognito automatically uses the roles that were created with the identity pool, 
    make sure to add the policies for the resources you want to use for the roles

*/

import { Polly } from "@aws-sdk/client-polly";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";


//We can make requests to Amazon Polly even though the user is unauthorized because Amazon Cognito is creating AWS credentials that enable them to do that
const client = new Polly({
        region: "region-id",
        credentials: fromCognitoIdentityPool({                                          //fromCognitoIdentityPool() will automatically select the identity pool for you
            client: new CognitoIdentityClient({ region: "region-id" }),                 //this will generate a credential for unauthorized users
            identityPoolId: "identity-pool-id"                                  
        }),
    });



















//================================================ AMAZON POLLY ======================================================================
/* 
    Amazon Polly is a service that gets text and turns it into life-like speech

    keep in mind that the implementation below is not the best one, just pay attention to the functions being used
*/

import { Polly } from "@aws-sdk/client-polly";
import { getSynthesizeSpeechUrl } from "@aws-sdk/polly-request-presigner";


function App() {
   
    //Constructing an object that will enable us to call Polly functions
    const client = new Polly({
         region: "us-west-1",
         credentials: fromCognitoIdentityPool({
           client: new CognitoIdentityClient({ region: "us-west-1" }),
           identityPoolId: "identity-pool-id"
        }),
    });  

 //the parameters required to make polly work
    const speechParams = {
        OutputFormat: "mp3", 
        SampleRate: "16000", 
        Text: "How are you", 
        TextType: "text", 
        VoiceId: "Matthew" 
    };

    useEffect(() => {
        const speakText = async () => {
            try{
                let url = await getSynthesizeSpeechUrl({          //this is the function that actually translates text into life-like speech
                    client, params: speechParams
                });
                document.getElementById('audioSource').src = url;         
                document.getElementById('audioPlayback').load();    //its important to reload the audio tag when you change the src attribute
            } catch (err) {
                console.log("Error", err);
            }
        };
        speakText();
    })

    return(
        <main>
            <audio id='audioPlayback' controls>                                                                
                <source id='audioSource' src="" type="audio/mp3"/>              
            </audio> 
        </main>
    )
}










//=============================================== HOW TO SETUP AWS CLI ====================================================================
/* 
    
1) Go to the IAM management console (not the identity center)

2) Select Users from the Access Management drop down on the left

3) Click on a user and make sure they have 'administrator access' permission, if they dont, then click on Add Permission button

4) Then Click on Security Credentials and scroll down until you see Access Key, then click on the Access Key button.

5) Save the Access Key ID and the secret access Key

6) then open up any terminal and type in 'aws configure', 
it will then ask you for the Access key ID, the secret key and the region, the output format doesnt matter right now

7) to test that everything is working, type in aws iam list-users

*/
