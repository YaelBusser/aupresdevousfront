import {StyleSheet} from "react-native";
import {Colors} from "react-native/Libraries/NewAppScreen";

const styles = StyleSheet.create({
    container: {
        alignItems: "center"
    },
    containerForm: {
        width: "80%"
    },
    title: {
        fontSize: 32,
        color: Colors.black
    },
    textInputs: {
        marginBottom: 50,
    },
    textInputsOutline: {
        borderColor: Colors.red,
        borderStyle: "solid",
        borderBlockColor: Colors.green,
        borderWidth: 1,
        backgroundColor: Colors.transparent,
    },
    buttonForm: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#196EEE"
    }
});

export default styles;
