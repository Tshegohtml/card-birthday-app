import React, { useState } from 'react';
import { Image, StyleSheet, View, TextInput, Button, TouchableOpacity, Modal } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Import your background images
import template1 from '@/assets/images/1.png';
import template2 from '@/assets/images/2.png';
import template3 from '@/assets/images/1.png';

export default function HomeScreen() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isPreviewVisible, setPreviewVisible] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('lightgrey');
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [showTemplates, setShowTemplates] = useState(false); // State to show/hide template options

  // List of background images
  const backgroundImages = [
    { id: 1, source: template1, title: 'Template 1' },
    { id: 2, source: template2, title: 'Template 2' },
    { id: 3, source: template3, title: 'Template 3' },
  ];

  const handleResetColor = () => {
    setBackgroundColor('lightgrey');
    setBackgroundImage(null);
  };

  const handleAddBackgroundImage = (imageSource) => {
    setBackgroundImage(imageSource);
    setShowTemplates(false); // Hide templates after selection
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#fff' }}
      headerImage={
        <Image
          source={require('@/assets/images/1.png')}
          style={styles.reactLogo}
        />
      }>
      
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">HAPPY BIRTHDAY FILLED WITH JOY AND LAUGHTER!</ThemedText>
        <HelloWave />
      </ThemedView>
      
      <ThemedView style={styles.cardCreationContainer}>
        <ThemedText type="subtitle">Create Your Custom Birthday Card</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor="#FFFFFF"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={[styles.input, styles.messageInput]}
          placeholder="Enter a personal birthday message"
          placeholderTextColor="#FFFFFF"
          value={message}
          onChangeText={setMessage}
          multiline
        />
        <Button
          title="Preview Card"
          onPress={() => setPreviewVisible(true)}
        />

        <View style={styles.colorButtonContainer}>
          <TouchableOpacity style={[styles.colorButton, { backgroundColor: 'green' }]} onPress={() => setBackgroundColor('green')} />
          <TouchableOpacity style={[styles.colorButton, { backgroundColor: 'orange' }]} onPress={() => setBackgroundColor('orange')} />
          <TouchableOpacity style={[styles.colorButton, { backgroundColor: 'yellow' }]} onPress={() => setBackgroundColor('yellow')} />
          <TouchableOpacity style={[styles.colorButton, { backgroundColor: 'pink' }]} onPress={() => setBackgroundColor('pink')} />
        </View>
        
        <Button title="Reset Color" onPress={handleResetColor} />

        <Button title="Add Background Image" onPress={() => setShowTemplates(true)} />  {/* Show templates on click */}

        {/* Modal to show the templates */}
        <Modal
          visible={showTemplates}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowTemplates(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {backgroundImages.map((image) => (
                <TouchableOpacity key={image.id} onPress={() => handleAddBackgroundImage(image.source)}>
                  <Image source={image.source} style={styles.templateImage} />
                  <ThemedText>{image.title}</ThemedText>
                </TouchableOpacity>
              ))}
              <Button title="Close" onPress={() => setShowTemplates(false)} />
            </View>
          </View>
        </Modal>
      </ThemedView>

      {isPreviewVisible && (
        <PreviewCard name={name} message={message} backgroundColor={backgroundColor} backgroundImage={backgroundImage} />
      )}
    </ParallaxScrollView>
  );
}

function PreviewCard({ name, message, backgroundColor, backgroundImage }) {
  return (
    <ThemedView style={[styles.previewContainer, { backgroundColor }]}>
      {backgroundImage && (
        <Image source={backgroundImage} style={styles.backgroundImage} />
      )}
      <ThemedText type="title">Here's Your Card Preview</ThemedText>
      <ThemedText style={styles.previewText}>To: {name}</ThemedText>
      <ThemedText style={styles.previewText}>{message}</ThemedText>
      <ThemedText type="title">🎈🌸🎉 Happy Birthday! 🎉🌸🎈</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  cardCreationContainer: {
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 12,
    color: '#FFFFFF', 
  },
  messageInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  reactLogo: {
    height: 300,
    width: 1100,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  previewContainer: {
    backgroundColor: 'lightgrey',
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    width: '80%',  // Make the container 80% of the screen width
    maxWidth: 550,  // Set a maximum width to avoid it getting too large
    alignSelf: 'center',  // Center the container horizontally
  },
  previewText: {
    fontSize: 18,
    marginVertical: 8,
  },
  colorButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  templateImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    borderRadius: 12,
    opacity: 0.3,
  },
});
