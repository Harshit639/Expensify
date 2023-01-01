import { StyleSheet, Text, TextInput,View } from "react-native";
import { GlobalStyles } from "../constants/styles";

function Input({label,textinputconfig,style}){

    const inputstyles = [styles.input]

    if(textinputconfig && textinputconfig.multiline){
        inputstyles.push(styles.multiline)
    }
    return(
        <View style={[styles.inputContainer,style]}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={inputstyles}  {...textinputconfig}/>
        </View>
    )
}

const styles =StyleSheet.create({
    inputContainer:{
        marginHorizontal:4,
        marginVertical:10,
        
    },
    label:{
        fontSize:12,
        color: GlobalStyles.colors.primary100,
        marginBottom: 4,
    },
    input:{
        backgroundColor: GlobalStyles.colors.primary100,
        color:GlobalStyles.colors.primary700,
        padding:6,
        borderRadius:6,
        fontSize:16,
        

    },
    multiline:{
        minHeight:100,
        textAlignVertical:'top',
    }
})

export default Input;