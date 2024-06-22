import { View, StyleSheet, Dimensions, Text, Image } from "react-native";
import React, { useState } from "react";
import CustomButton from "../components/CustomButton";
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Directions, Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { FadeIn, FadeOut, SlideInRight, SlideOutLeft } from "react-native-reanimated";
import Carousel from 'react-native-reanimated-carousel';

const onboardingSteps = [
    {
        icon: 'sports-football',
        title: 'Welcome to SportsBuddy',
        description: 'Play your favorite sports',
    },
    {
        icon: 'sports-kabaddi',
        title: 'Team up',
        description: 'Find athletes to play with',
    },
    {
        icon: 'place',
        title: 'Find a Club',
        description: 'See sports clubs near you',
    },
    {
        icon: 'date-range',
        title: 'Set The Date',
        description: 'Schedule your game',
}
];

// export default function OnboardingScreen(){

//     const [screenIndex, setScreenIndex] = useState(0);

//     const data = onboardingSteps[screenIndex];

//     const onContinue = () => {
//         const isLast = screenIndex === onboardingSteps.length - 1;
//         if(isLast){
//             registration();
//             setScreenIndex(0);
//         } else {
//             setScreenIndex(screenIndex + 1);
//         }
//     };

//     const onBack = () => {
//         const isFirst = screenIndex === 0;
//         if(isFirst){
//             setScreenIndex(0);
//         } else {
//             setScreenIndex(screenIndex - 1);
//         }
//     }

    // const navigation = useNavigation();

    // const endOnboarding = () => {
    //     navigation.navigate("SignIn");
    //   };

    // const registration = () => {
    //     navigation.navigate("SignUp");
    // }

//     const swipes = Gesture.Simultaneous(
//     Gesture.Fling().direction(Directions.LEFT).onEnd(onContinue),
//     Gesture.Fling().direction(Directions.RIGHT).onEnd(onBack)
//     );

//     return(
//         <GestureDetector gesture={swipes}>
//         <View style={styles.page} key={screenIndex}>
//             <StatusBar style="auto" />
//         <View style={styles.stepIndicatorContainer}>
//             {onboardingSteps.map((step, index) => (
//                 <View 
//                 key={index}
//                 style={[styles.stepIndicator, {backgroundColor: index === screenIndex ? '#FFBD59' : 'white'}]} 
//                 />
//             ))}
//         </View>
//         <Animated.Image entering={SlideInRight} source={require('../assets/images/logo.png')} style={styles.image} />
//         <Animated.View entering={FadeIn} exiting={FadeOut}>
//         <MaterialIcons name={data.icon} size={60} color="black" />
//         </Animated.View>
//         <Animated.Text entering={SlideInRight} exiting={SlideOutLeft} style={styles.title}>{data.title}</Animated.Text>
//         <Animated.Text entering={SlideInRight.delay(100)} style={styles.description}>{data.description}</Animated.Text>
//             <View style={styles.footer}>
//                 {/* <CustomButton onPress={onContinue} text={"Continue"} />
//                 <CustomButton onPress={endOnboarding} text={"Skip To Sign In"} /> */}
//                 <CustomButton onPress={endOnboarding} text={"Continue"} />
//             </View>
//         </View>
//         </GestureDetector>
//     );
// }

export default function OnboardingScreen(){

    const [screenIndex, setScreenIndex] = useState(0);

    const data = onboardingSteps;

    const navigation = useNavigation();

    const endOnboarding = () => {
        navigation.navigate("SignIn");
      };

    const registration = () => {
        navigation.navigate("SignUp");
    }

    const width = Dimensions.get('window').width;

    const height = Dimensions.get('window').height;

    return (
        <View style={{ flex: 1 }}>
            <Carousel
                loop
                width={width}
                height={height}
                autoPlay={true}
                data={onboardingSteps}
                scrollAnimationDuration={1000}
                onSnapToItem={(screenIndex) => setScreenIndex(screenIndex)}
                renderItem={({ item: data }) => (
         <View style={styles.page}>
             <StatusBar style="auto" />
         <View style={styles.stepIndicatorContainer}>
             {onboardingSteps.map((_step, index) => (
                <View 
                key={index}
                />
            ))}
        </View>
        <Image source={require('../assets/images/logo.png')} style={styles.image} />
        <View>
        <MaterialIcons name={data.icon} size={60} color="black" />
        </View>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.description}>{data.description}</Text>
            <View style={styles.footer}>
                <CustomButton onPress={endOnboarding} text={"Continue"} />
            </View>
        </View>
                )}
            />
        </View>
    );
}


const styles = StyleSheet.create({

    page: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: 'white',
        padding: 20
    },
    image: {
        width: "100%",
        height: undefined,
        aspectRatio: 16 / 9,
        alignSelf: 'center',
        margin: 20,
        marginTop: 70
    },
    title: {
        color: 'black',
        fontSize: 26,
        fontWeight: "bold",
        letterSpacing: 1
    },
    description: {
        color: 'black',
        fontSize: 18
    },
    footer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        paddingHorizontal: 20,
    },
    stepIndicatorContainer: {
        flexDirection: 'row',
        gap: 8,
        marginHorizontal: 15
    },
    stepIndicator: { 
        flex: 1,
        height: 5, 
        backgroundColor: '#3B71F3',
        borderRadius: 10
    }

})

