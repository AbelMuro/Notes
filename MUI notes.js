//how to set up MUI base in your application
//
//   1) npm install @mui/system  
//      this package enables you to use styled(), which enables you to style MUI components
//
//   2) npm install @mui/icons-material
//      this package lets you use all the icons that MUI has to offer
//
//   3) npm install @mui/x-data-grid
//      this package lets you use the grid components in MUI, this is for organizing data in a table and styling it (also good for pagination)
//
//   3) npm install @emotion/react  @emotion/styled
//      this package contains the core functionalities for MUI
//
//   4) npm install @mui/material
//      the package above contains all the components in the MUI framework
//  
//     keep in mind that all MUI components are organized into 'slots'
//     you can think of slots as just html tags that are nested within each other
//     the root 'slot' is the parent html tag and the inner 'slot' is the actual MUI component
//     for example: the badge component has root slot of <span class="BaseBadge-root"> and the inner slot is another <span class="BaseBadge-badge">
            
import ButtonUnstyled, {ButtonUnstyledClasses} from '@mui/base/ButtonUnstyled';         //you will have to import every component individually like this
import BadgeUnstyled, {BadgeUnstyledClasses} from "@mui/base/BadgeUnstyled";            //each component has an object that contains all their classes
import SwitchUnstyled, {switchUnstyledClasses} from '@mui/base/SwitchUnstyled';     
















//----------------------------------------------------------- COMPONENTS ------------------------------------------------------------------------------
import Button from '@mui/material/Button';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {styled} from '@mui/system'

//you can create your own custom colors like this
const theme = createTheme({
      palette: {
            customColor: {
                 main: '#FC3631',                                    //hex code for a shade of red, this will the main color of the button
                 contrastText: '#FFF'                                //hex code for a shade of gold, this will the color of the text in the button  
            }
      }        
})

//this is the best way to style MUI components
const StyledButton = styled(Button)`                      //styled is a function that lets us use css properties to style MUI components
    color: white;                                         
    background-color: ${blue[500]};                       //you can also include any js variable and interpolate it like this

    &:hover {                                             //& operator points to the Button component, this is similar to .Button:hover
        background-color: ${blue[600]};
    }

    &:active{                                             //& operator points to the Button component, this is similar to .Button:active
        background-color: red;
    }
`

function MUI() {
            
       const handleClick() {
        alert("you clicked this button")
       }

      return(
            <ThemeProvider theme={theme}>                                                                
                <Button variant="contained"> Click me! </Button>                           {<!-- variant prop gives you different types of button -->}
                <Button sx={{width: 400, backgroundColor: 'red'}}> Click here! </Button>   {<!-- sx property is similar to inline styles -->}
                <Button color="customColor"> Click me!</Button>                            {<!-- you can add your own custom colors like this -->}
                <Button onClick={handleClick}> Click me!</Button>                          {<!-- you can add event handlers like this -->}               
                <Button href={"http://www.google.com"}> Click Me! </Button>                {<!-- you can use any built in attributes for these MUI components-->}
                <StyledButton>                                                             {<!-- You can create your own custom MUI components like this-->}
                        "Click here"
                <StyledButton/>
            </ThemeProvider>  
      )          
}









//-------------------------------------------------------------- MUI ICONS ---------------------------------------------------------------------------------

import MenuIcon from '@mui/icons-material/Menu';

function MUI() {
   return(
         <MenuIcon fontSize={"large"}>
   )         
}









//---------------------------------------------------------- USE MEDIA QUERIES-------------------------------------------------------------------------------
import {useMediaQueries} from '@mui/material';


function MediaQueries() {
          const mobile = useMediaQueries("(max-width: 400px)");
            
          return(
                 mobile ? <div> "in mobile" </div> : <div> "NOT in mobile" </div>      
          )            
}










//------------------------------------------------------------ DIALOG POP UP BOXES ----------------------------------------------------------------
import {Dialog, DialogContent, DialogTitle, DialogActions} from '@mui/material';

function DialogBoxes(){
    const [openDialog, setOpenDialog] = useState(false);
            
    const handleDialog = () => {
        setOpenDialog((prevState) => {
               return !prevState;
        })
    }
           
   return (
       <Button onClick={handleDialog} variant="outlined">                                       //clicking this button will trigger the dialog box
           "Open Dialog" 
       </Button>
               
       <Dialog open={open}>                                                                    //this is the actual dialog box
            <DialogTitle> "My Dialog" </DialogTitle>
            <DialogContent> "This is where the content of the dialog is" </DialogContent>
            <DialogActions> 
                   <Button onClick={handleDialog}> "Cancel" </Button>
                   <Button onClick={handleDialog}> "OK" </Button>   
            </DialogActions>
       </Dialog>
   )              
}



    
    
    
    
    
    
 //----------------------------------------------------------- GRID WITH PAGINATION ---------------------------------------------------------------------
//keep in mind that GRID was designed to handle very primitive data values, like strings and numbers.

import {DataGrid} from '@mui/x-data-grid';                                //this package requires @mui/icons-material
import {useDemoData} from '@mui/x-data-grid-generator';                   //generates fake data (make sure to npm install this too)

export default function App() {
     const [pageSize, setPageSize] = useState(5);
     const [rows, setRows] = useState([]);
     const [columns; setColumns] = useState([]);
            
     const handleSizeChange = (newSize) => {                              //we create a re-render everytime the user decides to switch the number of items 
        setPageSize(newSize)
     };       
     
     useEffect(() => {                                                    //its a good idea to create the rows and columns of the grid
            const currentRows = [
                 { id: 1, col1: 'Hello', col2: 'World' },                 //this will define the actual data in the grid
                 { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },      //remember to match these key names (col1, col2) to the key names (field) in the currentColumn
                 { id: 3, col1: 'MUI', col2: 'is Amazing' },
            ];
           const currentColumns = [
                 { field: 'col1', headerName: 'Column 1', width: 150 },   //this will define the column headers
                 { field: 'col2', headerName: 'Column 2', width: 150 },
            ];
           setRows(currentRows);
           setColumns(currentColumns);
     },[])
  
     return(
       <div style={{height: 400, width: "100%"}}>                       //its important to put the grid inside a container like this                        
          <DataGrid
             rows={rows}                                                 //actual data for the grid
             columns={columns}                                           //column headers
             pageSize={pageSize}                                         //the current page size (number of rows) in the first page of the grid
             onPageSizeChange={handleSizeChange}                        //event handler that will handle the change in page size
             rowsPerPageOptions={[5, 10, 20]}                           //the different number of rows that the user can choose between
             pagination                                                 //keyword pagination is required                        
           />
        </div>
     );       
}





//-----------------------------------------------------------PAGINATION WITHOUT GRIDS ----------------------------------------------------------------------------
import {Pagination} from '@mui/material';

export default function BasicPagination() {
     const [currentPage, setCurrentPage] = useState(1);               
            
     const handlePageChange = (event, newPage) => {
           setCurrentPage(newPage)
     }

     return(
           <>
               <Pagination 
                 page={currentPage}                         //current page
                 onChange={handlePageChange}                //handler that will handle the page change
                 count={10}                                 //number of pages
                 color="secondary"                          //color of the selected page (in this case, the color will be purple)
                 size="large"                               //size of all the text
               />
           </>
     )

}






