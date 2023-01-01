import { Pressable, StyleSheet,View } from "react-native";
import {Ionicons} from '@expo/vector-icons'

function IconButton({name,size,color,onPress}){

    return(
        <Pressable style={({pressed}) => pressed && styles.pressed} onPress={onPress}>
            <View style={styles.buttoncontainer}>
                 <Ionicons name={name} size={size} color={color}/>
            </View>
        </Pressable>
    )

}


const styles = StyleSheet.create({
    buttoncontainer:{
        padding:8,
        marginHorizontal:8,
        marginVertical:2,
    },
    pressed:{
        opacity:0.75
    }
   
})

export default IconButton;