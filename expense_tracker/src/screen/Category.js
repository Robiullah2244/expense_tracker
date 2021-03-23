import React, { Component } from 'react'
import { Text, TouchableOpacity, View, Modal, KeyboardAvoidingView, TextInput, ScrollView, StyleSheet, FlatList } from 'react-native'
import Header from 'expense_tracker/src/component/Header';
import Button from 'expense_tracker/src/component/Button';
import Background from 'expense_tracker/src/component/Background';
import {PrimaryBlue, Gray, Green} from 'expense_tracker/src/style/Colors';
import Styles from 'expense_tracker/src/style/Styles';

import { connect } from 'react-redux';
import { expensesTypeCreateRequest } from '../store/expenses';
class Category extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            category: '',
        }
    }

    addCategory = () => {
        if(this.state.category != '')
            this.props.expensesTypeCreateRequest(this.state.category)
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
                        <Text style={{fontWeight: "bold", fontSize: 16}}>#</Text>
                        <Text style={{fontWeight: "bold", fontSize: 16}}>Category Title</Text>
                    </View>
                </View>
            </View>
        );
    }

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
                        <Text style={{fontWeight: "bold", fontSize: 16}}>{item.title}</Text>
                    </View>
                </View>
            </View>
        );
    };
    
    render() {
        return (
            <>
                <Header headerText='Category' navigation={this.props.navigation}/>
                <Background>
                    <View>
                        <View style={{flexDirection: 'row',}}>
                            {/* <Button type='primary' title='Add New Category' width={150}/> */}
                            <TextInput 
                                style={[Styles.DefaultTextInput, {width: 160, height: 36}]}
                                placeholder="Category"
                                onChangeText={text => this.setState({category: text})}
                                keyboardType="numeric"
                            />
                            <Button
                                onPress={() => this.addCategory()}
                                title='Add New Category'
                                buttonStyle={{backgroundColor: PrimaryBlue, width: 136, height: 36, borderRadius: 8}}
                                titleStyle={{color: 'white', fontSize: 14, fontWeight: 'bold',}}
                            />
                        </View>

                    </View>

                    <View style={styles.flatListContainer}>
                        <ScrollView>
                            <FlatList
                                data={this.props.categoryList}
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

                </Background>
            </>
        )
    }
}

const mapStateToProps =  state => {console.log(state);return({
    categoryList: state.entities.expenses.categoryList,
})}
const mapDispatchToProps =  dispatch => ({
    expensesTypeCreateRequest: (params) => dispatch(expensesTypeCreateRequest(params)),
    
});
export default connect(mapStateToProps, mapDispatchToProps)(Category)


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
