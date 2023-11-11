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
    
    
--------------------------------------------HOW TO MANUALLY DEPLOY A WEBSITE WITH S3----------------------------------------------------------------------

1) Create a bucket in S3 console

2) set the following options for the bucket
    --ACL's enabled                                (in case you miss this part, you can go to 'Permissions', and then to 'Object Ownership', then click on ACL's enabled)
    --unblock all public access                    (in case you miss this part, you can go to 'Permissions', then to 'Block Public Access', then uncheck 'Block all public access' )
    
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





------------------------------------------------HOW TO CONNECT A GITHUB REPOSITORY TO S3------------------------------------------------------------
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




//========================================= AMAZON CODEPIPELINE ================================================================












//=============================================== AMAZON EC2 INSTANCE ==============================================================
/* 
    Amazon EC2 instance is a service that launches/deploys virtual servers in the cloud. An instance is an individual server
    in the cloud.
*/


//--------------------------------------------- HOW TO CREATE AN EC2 INSTANCE -------------------------------------------------------

/* 
    1) Go to the EC2 console
    
    2) in the Launch Instance section, click on Launch Instance button

    3) on the next page, choose a name for your instance
    
    4) then choose the Amazon Machine Image (AMI), this is selecting the operating system for your instance
    
    5) then select the instance type, this will describe the storage capacity, speed, number of cpu cores, and network performance of your instance
    
    6) create a key pair name, this will be used to connect to your instance
    
    7) configure the network settings
    
    8) configure the storage capacity
    
    9) Click on Launch Instance button
    
    10) what this does is create a server on the cloud, you may need to wait a few minutes for the server to be online
    
    11) Once the server is online, you can connect to it. The server will take the form of a terminal

*/













//================================================== AMAZON IAM =========================================================================

/* 
    Amazon IAM is a service that controls which users have authorization to use specific resources in AWS. The idea behind 
    these IAM users is to enable other people within an organization to use the same AWS account and its services. As the organization grows, 
    you can put IAM users within IAM groups that have the same permissions, thereby simplifying the permissions being delegated.
    
    By default, an IAM user doesnt have any permissions. The root user will have to assign a 'policy' that describes 
    the permissions to the IAM user. Once the IAM user has the policy, they can access the AWS resources. Policies are basically JSON files
    
    Policies can also be assigned to Roles. Roles were designed to give temporary access to an IAM user to a resource that they 
    normally dont have permission for. If an IAM user doesn't have permission to access a bucket in S3, they can use a 'Role' to gain 
    temporary access to that bucket, but the Role must have the policy that gives permission to that bucket. Keep in mind that during the
    time the IAM user has a Role, they give up their previous policy temporarily.

    When you create a AWS account, you are given a 'root' user account that has ALL administrative access. However, 
    it is strongly recommended to not use this root account for everyday tasks for security reasons. The Root user should 
    only be used for actions that require the root user. For other trivial actions, an IAM account should be used

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
