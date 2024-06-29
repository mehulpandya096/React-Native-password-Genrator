/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
// form Validation
import * as Yup from 'yup';
// fromic
import {Formik} from 'formik';
// bouncyCheck BOX
import BouncyCheckbox from 'react-native-bouncy-checkbox';
//! password schema by Yup
const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(8, '  should be min of 4  characters ')
    .max(16, 'should be max of 16  characters')
    .required('Length is required'),
});

export default function App() {
  const [password, serPassword] = useState('');
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);

  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  //* Genrating password String
  const generatePasswordStrig = (passwordLength: number) => {
    let characterList = '';
    const uppercaseChar = 'ABCDEFGHIJKLMNOPRSTUVWXYZ';
    const lowerCaseChar = 'abcdefghijklmnopqrstuvwxyz';
    const digitChars = '0123456789';
    const spcialChar = '!@#$%^&*()_+';

    if (lowerCase) {
      characterList += lowerCaseChar;
    }
    if (upperCase) {
      characterList += uppercaseChar;
    }
    if (numbers) {
      characterList += digitChars;
    }
    if (symbols) {
      characterList += spcialChar;
    }

    const passwordResult: any = createPassword(characterList, passwordLength);
    serPassword(passwordResult);
    setIsPasswordGenerated(true);
  };

  //!password  Cration by Schema
  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
  };

  //!  Reset Passwords
  const resetPasswordState = () => {
    serPassword('');
    setIsPasswordGenerated(false);
    setLowerCase(true);
    setUpperCase(false);
    setNumbers(false);
    setSymbols(false);
  };

  return (
    //here are all jsx are for logic and Componets
    <ScrollView keyboardShouldPersistTaps="handled" style={styles.Container}>
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}> Password Generator 🔒🔑 </Text>
          {/* //adding formic */}
          <Formik
            initialValues={{passwordLength: ''}}
            validationSchema={PasswordSchema}
            onSubmit={vlaues => {
              generatePasswordStrig(+vlaues.passwordLength);
            }}>
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,
            }) => (
              <>
                <View style={styles.inputWarapper}>
                  <View style={styles.inputColumn}>
                    {/* <Text style={styles.heading}> Password Length </Text> */}
                  </View>
                  <TextInput
                    style={styles.inputStyle}
                    placeholderTextColor="#FFF"
                    value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')}
                    placeholder="Minimum 8 digit password"
                    keyboardType="numeric"></TextInput>
                </View>

                {touched.passwordLength && errors.passwordLength && (
                  <Text style={styles.errorText}>{errors.passwordLength} </Text>
                )}
                {/* BouncyCheck box */}
                <View style={styles.inputWarapper}>
                  {/* <Text style={styles.headingText}> Include LowerCase </Text> */}
                  <BouncyCheckbox
                    text=" Include LowerCase"
                    isChecked={lowerCase}
                    onPress={() => setLowerCase(!lowerCase)}
                    fillColor="#29AB87"
                    textStyle={{color: '#FFF'}}
                  />
                </View>

                <View style={styles.inputWarapper}>
                  {/* <Text style={styles.headingText}> Include UpperCase </Text> */}
                  <BouncyCheckbox
                    text="Include UpperCase "
                    isChecked={upperCase}
                    onPress={() => setUpperCase(!upperCase)}
                    fillColor="red"
                    textStyle={{color: '#FFF'}}
                  />
                </View>
                <View style={styles.inputWarapper}>
                  {/* <Text style={styles.headingText}> Include Numeric </Text> */}
                  <BouncyCheckbox
                    text="Include Numeric"
                    isChecked={numbers}
                    onPress={() => setNumbers(!numbers)}
                    fillColor="blue"
                    textStyle={{color: '#FFF'}}
                  />
                </View>
                <View style={styles.inputWarapper}>
                  {/* <Text style={styles.headingText}> Include Symbols </Text> */}
                  <BouncyCheckbox
                    text="Include Symbols"
                    isChecked={symbols}
                    onPress={() => setSymbols(!symbols)}
                    fillColor="pink"
                    textStyle={{color: '#FFF'}}
                  />
                </View>

                <View style={styles.formActions}>
                  <TouchableOpacity
                    disabled={!isValid}
                    style={styles.primaryBtn}
                    onPress={handleSubmit}>
                    <Text style={styles.primaryBtnText}>Genrate Passs </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={() => {
                      handleReset();
                      resetPasswordState();
                    }}>
                    <Text style={styles.secondryBtnText}> Reset Password </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
          {isPasswordGenerated ? (
            <View style={[styles.cards, styles.cardElevated]}>
              <Text style={styles.subTitle}> Result 🔒🔑 : </Text>
              <Text selectable={true} style={styles.genPass}>
                {password}
              </Text>
            </View>
          ) : null}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: 'rgb(0,8,35)',
  },
  appContainer: {
    paddingTop: 100,
    flex: 1,
  },
  formContainer: {
    padding: 25,
  },

  errorText: {
    color: 'red',
    fontSize: 13,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Arial, sans-serif',
    color: '#FFF',
  },
  inputWarapper: {
    paddingTop: 25,
  },
  formActions: {
    paddingTop: 30,
    paddingBottom: 30,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  inputColumn: {},
  inputStyle: {
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#FFF',
    color:'#FFF'
  },
  headingText: {
    fontSize: 15,
    fontFamily: 'Arial, sans-serif',
    color: '#FFF',
  },
  primaryBtn: {
    backgroundColor: '#3572EF',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: 130,
  },
  primaryBtnText: {
    fontSize: 15,
    fontFamily: 'Arial, sans-serif',
    color: '#FFF',
  },
  secondaryBtn: {
    backgroundColor: '#3572EF',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: 130,
  },
  secondryBtnText: {
    fontSize: 15,
    fontFamily: 'Arial, sans-serif',
    color: '#FFF',
  },
  cards: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    // Elevation for Android
    elevation: 5,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },

  cardElevated: {},
  description: {
    fontSize: 12,
    fontFamily: 'Arial, sans-serif',
    color: '#333',
  },
  subTitle: {
    color: '#333',
    fontFamily: 'Arial, sans-serif',
  },
  genPass: {
    color: '#333',
    fontSize: 19,
    fontFamily: 'Arial, sans-serif',
  },
});
