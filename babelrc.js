// make sure to save the file as .babelrc

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
