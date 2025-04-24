// make sure to save the file as .babelrc
// npm install babel-plugin-root-import --save-dev


{
"plugins": [
    [
      "babel-plugin-root-import",                            
      {
        "paths": [
          {
            "rootPathSuffix": "./src",             
            "rootPathPrefix": "~/"                //  ~/ will now represent ./src    so you dont have to write ../../../../src
          }
        ]
      }
    ]
  ]
}
