import { Pressable, StyleSheet, View,Text } from "react-native";
import { GlobalStyles } from "../constants/styles";
import FormattedDate from "../util/formatteddate";
import {useNavigation} from '@react-navigation/native'





function Expenseitem({id,description,date,amount}){
    const navigation = useNavigation()

    function manageexpensehandler(){
        navigation.navigate('manageexpense',{
            expenseId:id,
    })
    }
    return(
        <Pressable style={({pressed}) => pressed && styles.presssed} onPress={manageexpensehandler}>
            <View style={styles.expenseitem}>
                <View>
                    <Text style={[styles.description,styles.textbase]}>{description}</Text>
                    <Text style={styles.textbase}>{FormattedDate(date)}</Text>
                </View>
                <View style={styles.amountcontainer}>
                    <Text style={styles.amount}>{amount.toFixed(2)}</Text>
                </View>
            </View>
        </Pressable>
    )

}

const styles = StyleSheet.create({
    expenseitem:{
        padding:12,
        marginVertical:8,
        backgroundColor:GlobalStyles.colors.primary500,
        flexDirection:'row',
        justifyContent:'space-between',
        borderRadius:6,
        elevation:3,
        shadowColor:GlobalStyles.colors.gray500,
        shadowOffset: {width:1,height:1},
        shadowRadius:4,
        shadowOpacity:0.4,
    },
    textbase:{
        color: GlobalStyles.colors.primary50,

    },
    description:{
        fontSize:16,
        marginBottom:4,
        fontWeight:'bold',
    },
    amountcontainer:{
        paddingHorizontal:12,
        paddingVertical:4,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:4,
        minWidth:80,
    },
    amount:{
        color: GlobalStyles.colors.primary500,
        fontWeight: 'bold',
       
    },
    presssed:{
        opacity:0.75,
    }

})

export default Expenseitem;