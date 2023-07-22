import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import {useSelector} from 'react-redux';
import {
  useRegisterDeleteMutation,
  useRegisterGetMutation,
  useRegisterUpdateMutation,
} from '../redux/service/RegisterService';

const LoginScreen = () => {
  const registerPostMethod = useSelector(
    (state: any) => state.register.registerDetailsPost,
  );
  const registerGetMethod = useSelector(
    (state: any) => state.register.registerDetailsGet,
  );
  const registerDeleteMethod = useSelector(
    (state: any) => state.register.registerDetailsDelete,
  );

  const [id, setId] = useState('');
  const [searchId, setSearchId] = useState('');
  const [deleteId, setDeleteId] = useState('');
  const [email, setEmail] = useState(registerPostMethod.email);
  const [name, setName] = useState(registerPostMethod.name);
  const [gender, setGender] = useState(registerPostMethod.gender);
  const [status, setStatus] = useState(registerPostMethod.status);

  console.log(id, 'id');
  console.log(searchId, 'searchid');
  console.log(deleteId, 'deleteId');
  console.log(registerDeleteMethod, 'registerDeleteMethod');
  console.log(registerGetMethod, 'registerGetMethod');
  console.log(email, 'email');
  console.log(name, 'name');
  console.log(gender, 'gender');
  console.log(status, 'status');

  const [register, {data, isSuccess, isLoading, error23, isError}] =
    useRegisterGetMutation();

  const [registerDelete, {data1, isSuccess1, isLoading1, error1, isError1}] =
    useRegisterDeleteMutation();

  const [registerUpdate, registerResponse] = useRegisterUpdateMutation();

  const handleIdChange = (text: any) => {
    setId(text);
  };

  const handleSubmit = () => {
    setSearchId(id);
    setEmail(registerGetMethod.email);
    setName(registerGetMethod.name);
    setGender(registerGetMethod.gender);
    setStatus(registerGetMethod.status);
  };

  useEffect(() => {
    register(searchId);
  }, [register, searchId]);
  // The component uses the useEffect hook to call the register function when searchId changes. This triggers the API call to retrieve user data based on the entered ID.

  useEffect(() => {
    registerDelete(deleteId);
  }, [registerDelete, deleteId]);
  // Similarly, the useEffect hook is used to call the registerDelete function when deleteId changes, which triggers the API call to delete user data.

  useEffect(() => {
    registerUpdate(registerGetMethod.id);
  }, [registerUpdate, registerGetMethod.id]);
  // The useEffect hook is also used to call the registerUpdate function when registerGetMethod.id changes. This updates the user data based on the entered ID.

  const handleSubmitDelete = () => {
    setDeleteId(searchId);
  };

  const handleUpdate = () => {
    const updatedUserData: any = {
      body: {
        email: email,
        name: name,
        status: status,
      },
      id: searchId,
    };
    registerUpdate(updatedUserData);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Id"
        value={id}
        onChangeText={handleIdChange}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Get Method</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSubmitDelete}>
        <Text style={styles.buttonText}>Delete Method</Text>
      </TouchableOpacity>

      <View>
        <Text>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
          editable={true}
        />
        <Text>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={text => setName(text)}
          editable={true}
        />
        <Text>Gender</Text>
        <TextInput
          style={styles.input}
          value={gender}
          onChangeText={text => setGender(text)}
          editable={true}
        />
        <Text>Status</Text>
        <TextInput
          style={styles.input}
          value={status}
          onChangeText={text => setStatus(text)}
          editable={true}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginTop: 50,
  },
  input: {
    marginBottom: 16,
    padding: 10,
    borderRadius: 20,
    borderWidth: 0.5,
  },
  button: {
    backgroundColor: '#005dab',
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
    width: 300,
    borderWidth: 1,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    width: 380,
    height: 110,
    borderWidth: 0.3,
    borderColor: 'black',
    borderRadius: 12,
    marginTop: 20,
  },
});
