/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component }from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Pressable
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Root, Popup } from 'popup-ui'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};




const config = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80
};

const truthsAndDares =require('./truthordare.json');

var index = 0;
export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      slide : 0,
      swipe: 'none',
      truth : -1,
      text : "ERROR",
    };
  }

  

  instructions(){
    index = Math.floor(Math.random() * 23);
    Popup.show({
      type: 'Success',
      title: 'Swiping guide',
      button: true,
      textBody: 'Swipe Left for Truth and Swipe Right for dare',
      buttonText: 'Ok',
      callback: () => Popup.hide()
    })
    this.setState({slide : 2, truth: 1, text: truthsAndDares['Truth'][index]['truth']})
    
  }


  componentDidMount() {
   
  
  }

    onSlide(direction){
      this.setState({swipe: direction})
      if(this.state.slide == 1){
        this.setState({slide : 2});
      }

      if(this.state.slide == 2){
        index = Math.floor(Math.random() * 23);

        if(direction == "SWIPE_RIGHT"){
          this.setState({truth:0});
          this.setState({text: truthsAndDares['Dare'][index]})
        }
       
        
        if(direction == "SWIPE_LEFT"){
          this.setState({truth :1})
          
          this.setState({text: truthsAndDares['Truth'][index]['truth']})
          //console.log("Truth be",truthsAndDares['Truth'][index]['truth']);
         
          
        }


       
       
      }

    
    }

  



    render() {
          return (
          <Root>
                <GestureRecognizer
                config={config}
                onSwipe={(direction, state) => this.onSlide(direction)}
                >
                 {this.state.slide == 0 ?
                  <View  style={{alignItems: 'center', justifyContent: 'center', height: "100%", backgroundColor:"#87CEEB" }}>
                        <Text style={{fontSize: 35, fontWeight: '800',  textShadowColor: 'rgba(0, 0, 0, 0.5)',
                textShadowOffset: {width: -1, height: 1},
                textShadowRadius: 5, color:'white'}}>Truth Or Dare</Text>
                        <Pressable
                          style={{backgroundColor: "white", borderRadius: 15, marginTop:30}}
                          onPress={() => this.instructions()}
                        >
                          <Text style={{fontSize: 18, fontWeight: '600', paddingBottom:6, paddingTop:6, paddingRight: 20, paddingLeft: 20}}
                          >Play</Text>
                        </Pressable>
                  </View>
                  :
                  <View >
                 
                  {this.state.slide == 2 ? 

                  
                  
                  <View style={{alignItems: 'center', justifyContent: 'flex-start',height: "100%", backgroundColor:"#87CEEB" , }}>
                  {this.state.truth == 1 ? <Text style={{marginTop: 50 ,color: 'white', fontSize :40, fontWeight: '800', flex:1, letterSpacing: 2}}> TRUTH</Text> : <Text style={{marginTop: 50, color: 'white',fontSize :40, fontWeight: '800', flex: 1, letterSpacing: 2}}> DARE</Text> }
                  <Text style={{flex:2, width: "70%", color: 'white', fontWeight: "600", textAlign: 'center',  fontSize: 35}}>{this.state.text}</Text>
                  </View>:
                  null
                  
                  
                  }

                  
                  </View>
              }
                </GestureRecognizer>
                </Root>
          
          
          );
        
    }

}


