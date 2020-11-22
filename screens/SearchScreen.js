import React from 'react';
import { Text, View, FlatList, TextInput, TouchableOpacity} from 'react-native';
import db from '../config'

export default class Searchscreen extends React.Component {
  constructor(){ 
    super()
    this.state = {transactions:[], lastDoc:"", search:""}
   
  }
  fetchMoreDocs=async()=>{
    var searchText = this.state.search.toUpperCase()
    var splitText = searchText.split("")
    if(splitText[0]==="B"){
  const query = await db.collection("Transactions").where("BookID", "==", searchText).startAfter(this.state.lastDoc).limit(10).get()
  query.docs.map(loadDoc=>{
    this.setState({
      transactions:[...this.state.transactions, loadDoc.data()],
      lastDoc:loadDoc
    })
  })
}else if (splitText[0]==="S"){
  const query = await db.collection("Transactions").where("StudentID", "==", searchText).startAfter(this.state.lastDoc).limit(10).get()
  query.docs.map(loadDoc=>{
    this.setState({
      transactions:[...this.state.transactions, loadDoc.data()],
      lastDoc:loadDoc
    })
  })
}
  }
  componentDidMount=async()=>{
    const query = await db.collection("Transactions").limit(10).get()
    query.docs.map(doc=>{
      this.setState({
      transactions:[],
      lastDoc:doc
      }
      )
    })
  }
searchForitem=async(searchText)=>{
  this.setState({
   transactions:[],    
  })
  var ChangeSearchText = searchText.toUpperCase()
  var splitText = ChangeSearchText.split("")
  if(splitText[0]==="B"){
    const transaction = await db.collection("Transactions").where("BookID","==", ChangeSearchText).get()
    transaction.docs.map(doc=>{
      this.setState({
      transactions:[...this.state.transactions, doc.data()],
      lastDoc:doc
      })
    })                      
  }else if (splitText[0]==="S"){
  const transaction = await db.collection("Transactions").where("StudentID", "==", ChangeSearchText).get()
  transaction.docs.map(doc=>{
    this.setState({
      transactions:[...this.state.transactions, doc.data()],
      lastDoc:doc
    })
  })
  }


}
    render() {
 
      return (
        
        <View>
<TextInput placeholder = "Enter Book ID / Student ID" onChangeText ={(text)=>{
  this.setState({
    search:text,
  })
}}></TextInput>
<TouchableOpacity onPress = {()=>{this.searchForitem(this.state.search)}}><Text>Search</Text></TouchableOpacity>
        
      <FlatList data={this.state.transactions} 
      renderItem={({item})=>(<View style = {{borderBottomWidth:2,
      }}><Text>
        {"Book ID : "+item.BookID}
        </Text>
        <Text>
          {"Student ID : "+item.StudentID}
        </Text>
        <Text>
          {"Transaction Type : "+ item.TransactionType} 
        </Text>
        
        <Text>  
          {"Date : "+ item.Date}
        </Text>
        </View>)}
        onEndReached={this.fetchMoreDocs}
        onEndReachedThreshold={0.7}
      >

      </FlatList>
      </View>
      )
    }
  }