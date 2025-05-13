//================================================= REACT NATIVE DIALOG ============================================
//npm install react-native-dialog
import Dialog from "react-native-dialog";

function App() {
  const [text, setText] = useState('');

  const handleText = (value) => {
      setText(value);
  }
  
  return(
      <Dialog.Container visible={true}>
          <Dialog.Title>'Account delete'</Dialog.Title>
          <Dialog.Description>
            'Do you want to delete this account? You cannot undo this action.'
          </Dialog.Description>
          <Dialog.Input value={text} onChange={handleText}/>            //all TextInput props will work with this component
          <Dialog.Button label="Cancel" />
          <Dialog.Button label="Delete" />
      </Dialog.Container>
  )
}
