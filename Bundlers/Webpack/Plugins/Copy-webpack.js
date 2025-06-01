
//------------------------------- copy-webpack-plugin
/* 
    This plugin is used to copy all assets from a folder to the bundled file.
    You will typically need this to include files that are NOT explicitly 
    imported in your project. The CopyWebpackPlugin() constructor accepts 
    an object with one property, patterns. The patterns property accepts an
    array of objects. Each of these objects will copy all files in one directory to another
    directory. These objects have the following properties


           from: '':             Specifies the directory of the folder we want to copy assets from.
           to: '':               Specifies the directory in the /dist folder where the copied files will be placed.
           context: ''           Specifies the root directory for the 'from' property 
//         toType:               Defines whether the 'to' property is a directory or file.  ('dir' or 'file')      
//         force: true           Forces overwriting of existing files. (if the 'to' directory has a file that already exists in the 'from' directory, then it will be overwritten)      
//         priority:             Accepts an integer that specifies which pattern object will have its directory copied first. (higher values means higher priority) 
/*         globOptions: [        Allows filtering files using glob patterns.
               ignore: ['**/excludedfolder/**', '**/*.md'],     // ** means anything in between,     * means any file name
//             dot: true,         Filters any file that starts with a dot (.env)
//             nocase: true,      If true, then matching will be case-insensitive (example.TXT will be the same as example.txt)
//             matchBase: true    If true, then it allows a pattern like "*.txt" to match any .txt file across all directories instead of requiring a full path match.
//         ]   
/*         filter: (directory) => {    A function to exclude certain files.
                return true or false
            }       
*/
/*         transform: (content, absolutePath) => {       Modifies file contents before copying.
                 return content.toString().replace('oldText', 'newText')
           }
*/            
*/*/*/

const CopyWebpackPlugin = require('copy-webpack-plugin');    // npm install copy-webpack-plugin -D        

module.exports = {
    plugins: [
        new CopyWebpackPlugin({patterns: [{ from: 'public', to: '' }]})                  //this will copy all the files from the public folder to the build root directory
    ]
}
