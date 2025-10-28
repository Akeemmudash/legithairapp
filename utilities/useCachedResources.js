import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const useCachedResources = () => {
    const [isLoadingComplete, setLoadingComplete] = useState(false);
    // Load any resources or data that we need prior to rendering the app
    useEffect(() => {

        const loadResourcesAndDataAsync = async () => {
            try {
                SplashScreen.preventAutoHideAsync()
                await Promise.all([
                    // Load fonts
                    Font.loadAsync({
                        ...Ionicons.font,
                        'Poppins-Bold': require('../assets/Poppins-Bold.ttf'),
                        'Poppins': require('../assets/Poppins-Medium.ttf'),
                    }),
                ])
            } catch (e) {
                // We might want to provide this error information to an error reporting service
                console.warn(e);
            } finally {
                setLoadingComplete(true);
                SplashScreen.hideAsync();
            }
        }

        loadResourcesAndDataAsync();
    }, []);

    return isLoadingComplete;
}

export default useCachedResources;


// import { useState, useEffect } from 'react';
// import * as Font from 'expo-font';
// import { Ionicons } from '@expo/vector-icons';

// const useCachedResources = () => {
//   const [isLoaded, setIsLoaded] = useState(false);
  

//   useEffect(() => {
//     const loadResourcesAndDataAsync = async () => {
//       try {
//         await Font.loadAsync({
//             ...Ionicons.font,
//          'Poppins': require('../assets/Poppins-Medium.ttf'),
//         });
//         // Add other resource loading here if necessary
//       } catch (e) {
//         console.warn(e);
//       } finally {
//         setIsLoaded(true);
//       }
//     };

//     loadResourcesAndDataAsync();
//   }, []);

//   return isLoaded;
// };

// export default useCachedResources;
