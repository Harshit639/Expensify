import { Pressable, StyleSheet, View ,Text} from "react-native";
import { GlobalStyles } from "../constants/styles";


function Button({children,mode,onPress,style}){
    return (
        <View style={style}>
            <Pressable style={({pressed}) => pressed && styles.pressed} onPress={onPress}>
                <View style={[styles.button, mode==='flat' && styles.flat]}>
                    <Text style={[styles.buttontext, mode==='flat' && styles.flattext]}>{children}</Text>
                </View>
            </Pressable>
        </View>
    )
}


const styles = StyleSheet.create({
    button:{
        borderRadius:4,
        padding:8,
        backgroundColor: GlobalStyles.colors.primary500,
    },
    flat:{
        backgroundColor: 'transparent',
    },
    buttontext:{
        color:'white',
        textAlign:'center',
        fontSize:16,
    },
    flattext:{
        color:GlobalStyles.colors.primary200,
        fontSize:16,
    },
    pressed:{
        opacity:0.75,
        backgroundColor:GlobalStyles.colors.primary100,
        borderRadius:4,
    }

})


export default Button;
