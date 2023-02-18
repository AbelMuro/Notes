//how to set up MUI in your application
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
//
//   4) npm install @emotion/react  @emotion/styled
//      this package contains the core functionalities for MUI
//
//   5) npm install @mui/material
//      the package above contains all the components in the MUI framework
//  
//     keep in mind that all MUI components are organized into 'slots'
//     you can think of slots as just html tags that are nested within each other
//     the root 'slot' is the parent html tag and the inner 'slot' is the actual MUI component
//     for example: the badge component has root slot of <span class="BaseBadge-root"> and the inner slot is another <span class="BaseBadge-badge">
//     you will need to keep this in mind if you want to style a MUI component, because MUI components have a bunch of nested components         















//--------------------------------------------------------- MUI PROPERTIES AND SX ---------------------------------------------------------
//Each component has documentation that will tell you which css properties can be used as props for that particular component
//also, each component has unique props that can be used by that component, such as 'variant' or 'inputProps'

import {Button, Stack} from '@mui/material';

function Properties() {
       return(
            <Button 
                   sx={{width: "100%",                                 //sx is similar to styled(), but it lets you apply the css properties as inline styles, keep in mind, that you can still access the default theme with sx
                        backgroundColor: "blue", 
                        "& :hover" : {color: "red"}}                  //you can apply pseudo elements and classes with sx
                      }                                                                                                          
                   variant={"text" | "contained" | "outlined"}       //some components have unique props that can style the component with its default styles
                   href="https://www.google.com/"                    //and you can also apply reserved attributes into the MUI component
                   ...
              >
              "Click here"     
            </Button>

            <Stack>
       )
}


// SX : system properties...
//     you can apply these css properties as props directly to MUI components ONLY if they support that specific css property

// <Stack backgroundColor="red"  width="150px"  height="150px"  justifyContent="center"  alignItems="center"></Stack>
//                          
//                          the above has the same effect as below
//
// <Stack sx={{backgroundColor: "red", width: "150px", height:"150px", justifyContent:"center", alignItems:"center"}}>






//----------------------------------------------------------- STYLED() ------------------------------------------------------------------------------
import {Button} from '@mui/material';
import {styled} from '@mui/system'       

       //This will apply css properties directly to the component, you can also include some build-in classes in MUI and style them
const StyledButton = styled(Button)`                      //styled is a function that lets us use css properties to style MUI components
    color: white;                                         
    background-color: blue;                      
    
    & :hover {                                             //this is similar to button:hover
        background-color: yellow;
    }
    & :active{                                             //this is similar to button:active
        background-color: red;
    }                                                       
`
        //You can access the default theme of the component this way
const otherStyledButton = styled(Button)(                   // you can also style MUI components this way,
       ({theme}) => `                                       
            color: ${theme.palette.text.secondary};
       `
);

function MUI() {         
       const handleClick() {
            alert("you clicked this button")
       }
      return(                                                           
            <StyledButton>                                                             {<!-- You can create your own custom MUI components like this-->}
                   "Click here"
             </StyledButton>
      )          
}




















//------------------------------------------------------------ CREATING THEMES -------------------------------------------------------
import {createTheme, ThemeProvider} from '@mui/material/styles';
                                                                   //you can create your own custom colors like this
const theme = createTheme({
      palette: {
            customColor: {
                 main: '#FC3631',                                    //hex code for a shade of red, this will the main color of the button
                 contrastText: '#FFF'                                //hex code for a shade of gold, this will the color of the text in the button  
            }
      }        
})

function MyTheme() {
      return(
            <ThemeProvider theme={theme}>      
                   <Button color="customColor"> "Click me!" </Button>
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
import {useMediaQuery} from '@mui/material';

function MediaQueries() {
          const mobile = useMediaQuery("(max-width: 400px)");
            
          return(
                 mobile ? <div> "in mobile" </div> : <div> "NOT in mobile" </div>      
          )            
}










//------------------------------------------------------------ DIALOG POP UP BOXES ----------------------------------------------------------------
//keep in mind that if you want to style a dialog, you should always style the DialogContent first
import {Dialog, DialogContent, DialogTitle, DialogActions} from '@mui/material';

function DialogBoxes(){
    const [openDialog, setOpenDialog] = useState(false);
            
    const handleDialog = () => {
        setOpenDialog((prevState) => {
               return !prevState;
        })
    }
    
    useEffect(() => {                                                 // you can use this useEffect to automatically close the dialog when the 
        const clickHandler = (e) => {                                 // user clicks on the background of the dialog
            if(e.target.matches('.MuiDialog-container'))              //.MuiDialog-container represents the background of the dialog, but NOT the dialog itself
                handleDialog();
        }
        document.addEventListener('click', clickHandler);
        return () => {
            document.removeEventListener('click', clickHandler);
        }
    }, [])
    
           
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



    
    
    
    
    
    
 //----------------------------------------------------------- PAGINATION WITH GRID (TABLES)---------------------------------------------------------------------
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


















//-----------------------------------------------------------PAGINATION WITHOUT GRID----------------------------------------------------------------------------
import {Pagination} from '@mui/material';

export default function BasicPagination() {
     const [currentPage, setCurrentPage] = useState(1);      
     const [totalPages, setTotalPages] = useState(1);
     const [data, setData] = useState([]);
     const postsPerPage = useRef(8);
            
     const handlePageChange = (event, newPage) => {
           setCurrentPage(newPage)
     }
     
     useEffect(() => {
        fetch("someurl.com")                                       //fetching data from some API
             .then((response) => {
                  return response.json();
             })
             .then((results) => {                                  //assume that results is an array
                  setData(results);
                  setTotalPages(Math.round(results.length / postsPerPage.current))
             })
     }, [])
                                                                        //currentPage = 2      postsPerPage = 8
    const lastPostIndex = currentPage * postsPerPage.current;           // lastPostIndex = 16
    const firstPostIndex = lastPostIndex - postsPerPage.current;        // firstPostIndex = 8
    const currentPosts = coinData.slice(firstPostIndex, lastPostIndex);  //slicing the array from 8 to 16
     
     return(
           <>
               <div className="allData">  
                      {currentPosts ? currentPosts.map((post) => {           //clicking on one of the buttons will display a different segment of the data
                               return(
                                    <div> 
                                       "you can style the data here"    
                                     </div>
                               )
                       }) : ""} 
                <div>
               <Pagination 
                 page={currentPage}                         //current page
                 onChange={handlePageChange}                //handler that will handle the page change
                 count={totalPages}                         //total number of pages
                 color="secondary"                          //color of the selected page (in this case, the color will be purple)
                 size="large"                               //size of all the text
               />
           </>
     )
}





















//----------------------------------------------------------------- ACCORDION ----------------------------------------------------------------------------
import {Accordion, AccordionSummary, AccordionDetails, Typography} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function MyAccordion(){
      return(
            <Accordion>
                  <AccordionSummary 
                        expandIcon={<ExpandMoreIcon />}                             //this is the arrow that loads in the accordion (you can use any icon)
                   >
                        <Typography> "Title"</Typography>                           //remember that you can add any icons, text or images here, but you should use <Stack> to help you align everything
                   </AccordionSummary>

                   <AccordionDetails> 
                           "Anything can go here, a list of links, anything"    
                    </AccordionDetails>
            </Accordion>
      )    
}



















//----------------------------------------------------------- TEXT FIELDS -----------------------------------------------------------
import TextField from '@mui/material/TextField';


function BasicTextFields(){
       const [input, setInput] = useState("");
       
       const handleChange = (e) => {
            setInput(e.target.value)
       }
       
       return(
             <TextField 
                     value={input}
                     onChange={handleChange}
                     id="passwordInput" 
                     label="Enter Password"                                  //this is what will tell the user what the input is about
                     variant={"outlined" | "filled" | "standard"}
                     inputProps={{fontFamily: "sans-serif", color: "red"}}                 //attributes that are applied to the <input> element                        
                     type="password"
                     name="password"
              >
       )

}



//----------------------------------------------------------MENU LINKS ----------------------------------------------------------------------------------
//The component below uses aria attributes, these attributes are designed to have one element control another element

import {Button, Menu, MenuItem} from '@mui/material';

function MenuLinks() {
      const [anchorEl, setAnchorEl] = useState(null);
      const open = Boolean(anchorEl);                              //converting the state variable into boolean
       
      const handleOpen = (e) => {                                  //the <Button/> component will trigger this event and pass an instance of the <Button/> component
          setAnchorEl(e.currentTarget);
      }

      const handleClose = () => {
          setAnchorEl(null);
      }
          
       return(
               <div>
                      <Button
                         id="basic-button"
                         onClick={handleOpen}                                       //when the user clicks on this button, the state variable will have an instance of this button
                       >
                          "Dashboard"
                      </Button>
                      <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}                                       //This is crucial, you must pass an instance of the <Button> for this to work
                          open={open}                                               //if open has the instance of <Button>, then the popup will appear, 
                          onClose={handleClose}
                       >
                            <MenuItem> Profile</MenuItem>
                            <MenuItem> My account</MenuItem>
                            <MenuItem> Logout</MenuItem>
                      </Menu>
            </div>
       )
}









