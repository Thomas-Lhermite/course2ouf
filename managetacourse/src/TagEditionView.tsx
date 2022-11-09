import React, { useState } from "react";
import { ToastAndroid, View } from "react-native";
import { BottomNavigation, Button, Text, withTheme } from "react-native-paper";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import NfcManager, { Ndef, NfcTech } from "react-native-nfc-manager";

NfcManager.start();

function TagView(): JSX.Element {
  return <BottomTagNavigator />;
}

export default withTheme(TagView);

const Tab = createMaterialBottomTabNavigator();

const BottomTagNavigator = () => (
  <Tab.Navigator initialRouteName="Lire">
    <Tab.Screen
      name="Lire"
      component={ScanTagRoute}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons
            name="nfc-search-variant"
            color={color}
            size={26}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Ecrire"
      component={WriteTagRoute}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="pencil" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Historique"
      component={HistoryTagRoute}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="history" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);

const HistoryTagRoute = () => {
  return (
    <View>
      <Text>Lister les tags</Text>
    </View>
  );
};

async function ReadTagNdef() {
  try {
    await NfcManager.requestTechnology(NfcTech.Ndef);
    const tag = await NfcManager.getTag();
    return tag;
  } catch (e) {
    console.log(e);
    ToastAndroid.show("Erreur lors de la lecture du tag", ToastAndroid.SHORT);
  } finally {
    NfcManager.cancelTechnologyRequest();
  }
}

async function ReadTagMifare() {
  try {
    await NfcManager.requestTechnology(NfcTech.MifareClassic);
    const tag = await NfcManager.getTag();
    console.log(tag);
    return tag;
  } catch (e) {
    console.log(e);
    ToastAndroid.show("Erreur lors de la lecture du tag", ToastAndroid.SHORT);
  } finally {
    NfcManager.cancelTechnologyRequest();
  }
}

const ScanTagRoute = () => {
  return (
    <View>
      <Text>Scanner des tags</Text>
      <Button onPress={ReadTagMifare}>Lire</Button>
    </View>
  );
};

type NfcTagProps = {
  userId: string;
};

async function writeDataNdef({ userId }: NfcTagProps) {
  try {
    await NfcManager.requestTechnology(NfcTech.Ndef);
    const data = Ndef.encodeMessage([Ndef.textRecord(userId)]);

    if (data) {
      await NfcManager.ndefHandler.writeNdefMessage(data);
    }
  } catch (e) {
    ToastAndroid.show(
      `Erreur lors de l'écriture du tag: ${e}`,
      ToastAndroid.SHORT
    );
  } finally {
    NfcManager.cancelTechnologyRequest();
  }
}

async function writeDataMifare({ userId }: NfcTagProps) {
  try {
    await NfcManager.requestTechnology(NfcTech.MifareClassic);
  } catch (error) {
    ToastAndroid.show(
      `Erreur lors de l'écriture du tag: ${error}`,
      ToastAndroid.SHORT
    );
  } finally {
    NfcManager.cancelTechnologyRequest();
  }
}

const WriteTagRoute = () => (
  <View>
    <Text>Ecrire sur des tags</Text>
    <Button onPress={ReadTagMifare}>Ecrire</Button>
  </View>
);
