// screens/CustomerSupportScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

export default function CustomerSupportScreen() {
  const [messages, setMessages] = useState([
    { from: 'admin', text: 'Xin chào! Bạn cần hỗ trợ gì?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() === '') return;
    const newMessages = [...messages, { from: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    // Giả lập phản hồi admin
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: 'admin', text: 'Cảm ơn bạn, chúng tôi sẽ phản hồi sớm.' }]);
    }, 1000);
  };

  // return (
  //   <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
  //     <ScrollView style={styles.chatContainer}>
  //       {messages.map((msg, index) => (
  //         <View
  //           key={index}
  //           style={[
  //             styles.message,
  //             msg.from === 'user' ? styles.userMsg : styles.adminMsg
  //           ]}
  //         >
  //           <Text style={styles.messageText}>{msg.text}</Text>
  //         </View>
  //       ))}
  //     </ScrollView>

  //     <View style={styles.inputContainer}>
  //       <TextInput
  //         style={styles.input}
  //         value={input}
  //         onChangeText={setInput}
  //         placeholder="Nhập tin nhắn..."
  //       />
  //       <TouchableOpacity onPress={handleSend} style={styles.sendBtn}>
  //         <Text style={styles.sendText}>Gửi</Text>
  //       </TouchableOpacity>
  //     </View>
  //   </KeyboardAvoidingView>
  // );
  return (
  <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    keyboardVerticalOffset={80} // 👈 Điều chỉnh tùy vào header/TabBar
  >
    <View style={styles.inner}>
      <ScrollView
        style={styles.chatContainer}
        contentContainerStyle={{ paddingBottom: 20 }}
        ref={(ref) => { scrollViewRef = ref }}
        onContentSizeChange={() => scrollViewRef?.scrollToEnd({ animated: true })}
      >
        {messages.map((msg, index) => (
          <View
            key={index}
            style={[
              styles.message,
              msg.from === 'user' ? styles.userMsg : styles.adminMsg
            ]}
          >
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Nhập tin nhắn..."
          placeholderTextColor="#888"
          multiline
          numberOfLines={3}
          underlineColorAndroid="transparent"
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendBtn}>
          <Text style={styles.sendText}>Gửi</Text>
        </TouchableOpacity>
      </View>
    </View>
  </KeyboardAvoidingView>
);

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inner: {
    flex: 1,
    justifyContent: 'space-between',
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  message: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  userMsg: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  adminMsg: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E5EA',
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
        minHeight: 80,         
        maxHeight: 100,        
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 12,
        fontSize: 16,
        backgroundColor: "#fff",
        color: "#000",
        
  },
  sendBtn: {
    // backgroundColor: '#007AFF',
    // borderRadius: 20,
    // paddingHorizontal: 20,
    // paddingVertical: 12,
    // marginLeft: 10,
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginLeft: 10,
    // backgroundColor: "#1e90ff",
    // borderRadius: 30,
    // padding: 14,
    // justifyContent: "center",
    // alignItems: "center",
    // height: 60,
     backgroundColor: "#4CAF50",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 50,
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  sendText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
