import React, { Component } from 'react'
import { Text, View, Picker, Modal, KeyboardAvoidingView, TextInput, FlatList, StyleSheet, ScrollView } from 'react-native'
import Header from 'expense_tracker/src/component/Header';
import {PrimaryBlue, Gray, GrayWithOpacity, Red} from 'expense_tracker/src/style/Colors';
import Styles from 'expense_tracker/src/style/Styles';
import Background from 'expense_tracker/src/component/Background';
import Button from 'expense_tracker/src/component/Button';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-ranges';

export default class Expense extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            modalVisible: false,
            invoiceDate: null,
        }
    }

    addExpense = () => {

    }

    clearDateRange = () => {
        this.setState({invoiceDate: null});
        this.picker.setState({
        startDate: null,
        endDate: null,
        clearStart: '',
        clearEnd: '',
        showContent: false,
        });
    };

    renderItem = (item, index) => {
        console.log(item);
        return(
            <View style={{marginTop: 8, marginHorizontal: 12,}}>
                <View
                    style={{
                    borderBottomColor: Gray,
                    borderBottomWidth: 1.5,
                    }}
                />

                <View style={{marginTop: 8}}>
                    <View style={{flexDirection: "row", justifyContent: "space-between",}}>
                        <Text style={{fontWeight: "bold", fontSize: 16}}>{index+1}</Text>
                        <Text style={{fontWeight: "bold", fontSize: 16}}>{item.datetime}</Text>
                        <Text style={{fontWeight: "bold", fontSize: 16}}>{item.category}</Text>
                        <Text style={{fontWeight: "bold", fontSize: 16}}>{item.description}</Text>
                    </View>
                </View>
            </View>
        );
    };

    render() {
        return (
            <>
                <Header headerText='Expense' navigation={this.props.navigation}/>
                <Background>

                    <Button
                        onPress={() => {this.setState({modalVisible: !this.state.modalVisible})}}
                        title='Add Expense'
                        buttonStyle={{backgroundColor: PrimaryBlue, width: 112, height: 36, borderRadius: 8}}
                        titleStyle={{color: 'white', fontSize: 14, fontWeight: 'bold',}}
                    />
                    <View style={{marginTop: 12}}>
                        <View style={{flex: 1, flexDirection:'row'}}>
                            <View style={{flex: 1, paddingVertical: 4, borderColor: 'rgba(0,0,0,0.2)', borderWidth: 1, borderRadius: 8,alignSelf:"center"}}>
                                <Picker style={{ height: 24}}>
                                    <Picker.Item label="Food" value="Food" />
                                    <Picker.Item label="Shopping" value="Shopping" />
                                </Picker>
                            </View>
                        </View>


                        <View style={{flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',}}
                        >
                            <View style={{flex: 1, marginTop: 8}}>
                                <DatePicker
                                    style={{
                                        height: 36,
                                        borderRadius: 8,
                                        borderColor: '#cccccc',
                                        borderWidth: 1,
                                    }}
                                    customStyles={{
                                        placeholderText: {fontSize: 14}, // placeHolder style
                                        headerStyle: {backgroundColor: PrimaryBlue}, // title container style
                                        headerMarkTitle: {}, // title mark style
                                        headerDateTitle: {}, // title Date style
                                        contentInput: {fontSize: 14}, //content text container style
                                        contentText: {fontSize: 14, color: 'black'}, //after selected text Style
                                    }} // optional
                                    ButtonStyle={{
                                        backgroundColor: PrimaryBlue,
                                        borderWidth: 1,
                                        borderRadius: 8,
                                        marginHorizontal: 20,
                                        borderColor: '#fff',
                                    }}
                                    ButtonTextStyle={{
                                        color: '#fff',
                                        alignSelf: 'center',
                                        padding: 10,
                                    fontSize: 16,
                                    }}
                                    centerAlign // optional text will align center or not
                                    allowFontScaling={false} // optional
                                    markText={'Select Date'}
                                    ButtonText="Select"
                                    placeholder={'Ex: Apr 27, 2018 → Jul 10, 2018'}
                                    mode={'range'}
                                    onConfirm={text => {
                                        this.setState({invoiceDate: text});
                                        console.log('invoiceDate: ', text);
                                    }}
                                    ref={ref => (this.picker = ref)}
                                    // value={this.state.invoiceDate}
                                    // selectedValue={'dscssdcsdfdjsbd'}
                                />
                            </View>
                            
                            <Icon
                                style={{padding: 10, marginLeft: -30, marginTop: -2}}
                                size={20}
                                name={'md-close'}
                                color={'red'}
                                onPress={() => this.clearDateRange()}
                            />
                        </View>

                        <Button
                            onPress={() => this.addExpense}
                            title='Filter'
                            buttonStyle={{backgroundColor: PrimaryBlue, width: 96, height: 36, borderRadius: 8, marginTop: 8}}
                            titleStyle={{color: 'white', fontSize: 14, fontWeight: 'bold',}}
                        />

                        <View style={styles.flatListContainer}>
                            <ScrollView>
                                <FlatList
                                    data={[{'id': 1, 'datetime': '12/09/2022 12:30PM', 'category': 'asdas', 'description': 'fsd'}, {'id': 2, 'datetime': '12/09/2022 12:30PM', 'category': 'asdas', 'description': 'fsd'}]}
                                    // data={this.state.filteredInvoices}
                                    renderItem={({item, index}) => this.renderItem(item, index)}
                                    keyExtractor={item => item.id.toString()}
                                    ItemSeparatorComponent={() => (
                                        <View style={{marginVertical: 4}} />
                                    )}
                                    ref={ref => {
                                        this.flatListRef = ref;
                                    }}
                                    initialNumToRender={8}
                                />
                            </ScrollView>
                        </View>

                    </View>

                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {this.setState({modalVisible: !this.state.modalVisible});}}
                        // onRequestClose={() => {this.modalVisible(!this.state.modalVisible)}}
                    >
                        <Icon name="md-close" size={36} color={Red} 
                            onPress={() => {this.setState({modalVisible: false})}}
                            style={{
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0
                            }} 
                        />
                        
                        <View style={[Styles.DefaultBorderStyle, { borderRadius: 12, margin: 8, marginTop: 50, padding: 12, borderColor: '#2383F7', borderWidth: 1.5,}]}>
                            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}>
                                <View style={{flexDirection:'row', paddingVertical: 4, marginTop: 8,}}>
                                    <Text style={{fontSize: 16}}>Add Expense</Text>
                                </View>
                                <TextInput 
                                    style={[Styles.DefaultTextInput, {height: 80}]}
                                    placeholder="Short description"
                                    onChangeText={text => this.setState({password: text})}
                                    multiline
                                />
                                <TextInput 
                                    style={Styles.DefaultTextInput}
                                    placeholder="Amount"
                                    onChangeText={text => this.setState({password: text})}
                                    keyboardType="numeric"
                                />
                                <Button
                                    onPress={() => this.addExpense}
                                    title='Add Expense'
                                    buttonStyle={{backgroundColor: PrimaryBlue, width: 112, height: 36, borderRadius: 8}}
                                    titleStyle={{color: 'white', fontSize: 14, fontWeight: 'bold',}}
                                />
                            </KeyboardAvoidingView>
                        </View>
                    </Modal>
               </Background>
            </>
        )
    }
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputWrap: {
    flex: 1,
    borderColor: '#cccccc',
    borderBottomWidth: 1,
    marginBottom: 10,
    borderWidth: 0,
    borderRadius: 8,
    height: 36,
    flex: 0.4875,
    //   padding:10
  },
  input: {
    fontSize: 14,
    marginBottom: -15,
    color: '#cccccc',
  },
  flatListContainer: {
    marginTop: 16,
    flex: 1,
    // paddingBottom: 8
  },
});