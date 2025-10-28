

import React, { memo } from 'react';
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const MainContainer = memo(({ children }) => {
    const insets = useSafeAreaInsets();
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;
    const containerStyle = {
        flex: 1,
        paddingTop: insets.top,
        paddingHorizontal: 19, 
        paddingBottom: 65,
        backgroundColor: 'white'
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                keyboardVerticalOffset={keyboardVerticalOffset}
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={containerStyle}>
                    {children}
                </View>
            </KeyboardAvoidingView>
        </GestureHandlerRootView>
    );
})

export default MainContainer;


// import { View } from "@gluestack-ui/themed";
// import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, View } from "react-native";
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

// const MainContainer = ({ children }) => {
//     const insets = useSafeAreaInsets();
//     const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;
//     const containerStyle = {
//         flex: 1,
//         margin: 19,
//         marginBottom: 40,
//         paddingTop: insets.top,
//     };
//     return (
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//             <View style={{ flex: 1 ,backgroundColor: "white"}}>
//                 <View style={{ ...containerStyle }}>
//                     <KeyboardAvoidingView keyboardVerticalOffset={keyboardVerticalOffset} style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
//                         {children}
//                     </KeyboardAvoidingView>
//                 </View>
//             </View>
//         </TouchableWithoutFeedback>
//     )
// }

// export default MainContainer;

