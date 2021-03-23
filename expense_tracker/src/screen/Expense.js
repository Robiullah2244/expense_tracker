import React, { Component } from 'react'
import { Text, View, Picker, Modal, KeyboardAvoidingView, TextInput, FlatList, StyleSheet, ScrollView, Alert } from 'react-native'
import Header from 'expense_tracker/src/component/Header';
import {PrimaryBlue, Gray, GrayWithOpacity, Red, Blue} from 'expense_tracker/src/style/Colors';
import Styles from 'expense_tracker/src/style/Styles';
import Background from 'expense_tracker/src/component/Background';
import Button from 'expense_tracker/src/component/Button';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-ranges';

import { connect } from 'react-redux';
import { expenseAddRequest, expenseFilterRequest, filteredExpenseListClearRequest } from '../store/expenses';
class Expense extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            modalVisible: false,
            filterDateRange: null,
            description: '',
            amount: 0,
            categoryId: '',
            filterCategoryId: ''
        }
    }

    componentDidMount = () => {
        this.props.filteredExpenseListClearRequest();
    }

    addExpense = () => {
        let description = this.state.description;
        let amount = this.state.amount;
        let categoryId = this.state.categoryId;
        console.log({description, amount});
        if(description != '' && amount != 0 && categoryId != '')
        {
            this.props.expenseAddRequest({description, amount, categoryId})
            this.setState({description:'', amount: 0, modalVisible: false});
        }
    }

    filter = () => {
        this.props.expenseFilterRequest({
            categoryId: this.state.filterCategoryId,
            dateRange: this.state.filterDateRange,
        })
    }

    clearFilterDateRange = () => {
        this.setState({filterDateRange: null});
        this.picker.setState({
            startDate: null,
            endDate: null,
            clearStart: '',
            clearEnd: '',
            showContent: false,
        });
    };

    showDescription = (description) => {
        Alert.alert(description);
    }
    ListHeader = () => {
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
                        <Text style={{fontWeight: "bold", fontSize: 14, flex: 0.1}}>#</Text>
                        <Text style={{fontWeight: "bold", fontSize: 14, flex: 0.3}}>Date</Text>
                        <Text style={{fontWeight: "bold", fontSize: 14, flex: 0.2}}>Category</Text>
                        <Text style={{fontWeight: "bold", fontSize: 14, flex: 0.25}}>Description</Text>
                        <Text style={{fontWeight: "bold", fontSize: 14, flex: 0.15}}>Amount</Text>

                    </View>
                </View>
            </View>
        );
    }

    renderItem = (item, index) => {
        return(
            <View style={{marginTop: 8, marginHorizontal: 12,}}>
                <View
                    style={{
                    borderBottomColor: Gray,
                    borderBottomWidth: 1.5,
                    }}
                />

                <View style={{marginTop: 8}}>
                    <View style={{flexDirection: "row", flex: 1}}>
                        <Text style={{fontWeight: "bold", fontSize: 13, flex: 0.1}}>{index+1}</Text>
                        <Text style={{fontWeight: "bold", fontSize: 13, flex: 0.3, alignContent: 'center'}}>{item.date}</Text>
                        <Text style={{fontWeight: "bold", fontSize: 13, flex: 0.2}}>{item.categoryId}</Text>
                        <Text style={{fontWeight: "bold", fontSize: 13, flex: 0.25, textDecorationLine: 'underline', color: Blue}} onPress={() => this.showDescription(item.description)}>Click Here</Text>
                        <Text style={{fontWeight: "bold", fontSize: 13, flex: 0.15,}}>{item.amount}</Text>
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
                        <View style={{flexDirection:'row'}}>
                            <View style={{flex: 1, paddingVertical: 4, borderColor: 'rgba(0,0,0,0.2)', borderWidth: 1, borderRadius: 8,alignSelf:"center"}}>
                                <Picker style={{ height: 24}} onValueChange={filterCategoryId => {this.setState({filterCategoryId: filterCategoryId})}}>
                                    <Picker.Item label="Select Category" value='' />
                                    {
                                        this.props.categoryList.map(element => {
                                            return (<Picker.Item label={element.title} value={element.id} />)
                                        })
                                    }
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
                                        this.setState({filterDateRange: text});
                                        console.log('filterDateRange: ', text);
                                    }}
                                    ref={ref => (this.picker = ref)}
                                    // value={this.state.filterDateRange}
                                    // selectedValue={'dscssdcsdfdjsbd'}
                                />
                            </View>
                            
                            <Icon
                                style={{padding: 10, marginLeft: -30, marginTop: -2}}
                                size={20}
                                name={'md-close'}
                                color={'red'}
                                onPress={() => this.clearFilterDateRange()}
                            />
                        </View>

                        <Button
                            onPress={() => this.filter()}
                            title='Filter'
                            buttonStyle={{backgroundColor: PrimaryBlue, width: 96, height: 36, borderRadius: 8, marginTop: 8}}
                            titleStyle={{color: 'white', fontSize: 14, fontWeight: 'bold',}}
                        />

                        <Text style={{alignSelf: 'flex-end', marginTop: 8, fontSize: 18}}>Total: {this.props.filteredExpenseList.reduce(function(acc, item) { return acc + Number(item.amount); }, 0)}</Text>
                            
                        <View style={styles.flatListContainer}>
                            <ScrollView>
                                <FlatList
                                    data={this.props.filteredExpenseList}
                                    // data={this.state.filteredInvoices}
                                    ListHeaderComponent={() => this.ListHeader()}
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
                                <View style={{flexDirection:'row', paddingVertical: 8, marginTop: 8,}}>
                                    <Text style={{fontSize: 16}}>Add Expense</Text>
                                </View>
                                <View style={{flexDirection:'row'}}>
                                    <View style={{flex: 1, paddingVertical: 4, borderColor: 'rgba(0,0,0,0.2)', borderWidth: 1, borderRadius: 8,alignSelf:"center"}}>
                                        <Picker style={{ height: 24}} onValueChange={categoryId => {this.setState({categoryId: categoryId})}}>
                                            <Picker.Item label="Select Category" value='' />
                                            {
                                                this.props.categoryList.map(element => {
                                                    return (<Picker.Item label={element.title} value={element.id} />)
                                                })
                                            }
                                        </Picker>
                                    </View>
                                </View>
                                <TextInput 
                                    style={[Styles.DefaultTextInput, {height: 80}]}
                                    placeholder="Short description"
                                    onChangeText={text => this.setState({description: text})}
                                    multiline
                                />
                                <TextInput 
                                    style={Styles.DefaultTextInput}
                                    placeholder="Amount"
                                    onChangeText={text => this.setState({amount: text})}
                                    keyboardType="numeric"
                                />
                                <Button
                                    onPress={() => this.addExpense()}
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


const mapStateToProps =  state => {console.log(state);return({
    filteredExpenseList: state.entities.expenses.filteredExpenseList,
    categoryList: state.entities.expenses.categoryList,
})}
const mapDispatchToProps =  dispatch => ({
    expenseAddRequest: (params) => dispatch(expenseAddRequest(params)),
    expenseFilterRequest: (params) => dispatch(expenseFilterRequest(params)),
    filteredExpenseListClearRequest: (params) => dispatch(filteredExpenseListClearRequest(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Expense)


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