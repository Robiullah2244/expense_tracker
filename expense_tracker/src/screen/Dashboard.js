import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Header from 'expense_tracker/src/component/Header';
import Background from 'expense_tracker/src/component/Background';

import { connect } from 'react-redux';
class Dashboard extends Component {
    render() {
        return (
            <>
                <Header headerText='Dashboard' navigation={this.props.navigation}/>
                <Background>
                    <View style={{ alignSelf: 'center', alignItems: 'center', marginTop: 96}}>
                        <Text style={{fontSize: 26, fontWeight: 'bold'}}>
                            Total Expenses
                        </Text>
                        <Text style={{fontSize: 26, fontWeight: 'bold'}}>
                            {this.props.expenseList.reduce(function(acc, item) { return acc + Number(item.amount); }, 0)}
                        </Text>
                    </View>
                </Background>
            </>
        )
    }
}

const mapStateToProps =  state => {console.log(state);return({
    expenseList: state.entities.expenses.expenseList,
})}
const mapDispatchToProps =  dispatch => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

