import { useState } from "react";
import { StyleSheet } from "react-native";
import {
  ViroARScene,
  ViroText,
  ViroTrackingStateConstants,
  ViroARSceneNavigator,
  ViroTrackingReason,
} from "@viro-community/react-viro";
import React = require("react");
import { resources } from "./res";

const HelloWorldSceneAR = () => {
  const [text, setText] = useState("initializing AR");

  function onInitialized(state: any, reason: ViroTrackingReason) {
    console.log("guncelleme", state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText("Arjun Patidar");
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      // Handle loss of tracking
    }
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroText
        text={text}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, -1]}
        style={styles.helloWorldTextStyle}
      />
    </ViroARScene>
    // <ViroScene>
    //   <ViroSkyBox
    //     source={{
    //       nx: resources.gridBg,
    //       px: resources.gridBg,
    //       ny: resources.gridBg,
    //       py: resources.gridBg,
    //       nz: resources.gridBg,
    //       pz: resources.gridBg,
    //     }}
    //   />
    //   <ViroOrbitCamera
    //     position={[0, 0, -0]}
    //     active={true}
    //     focalPoint={[0, 0, -1]}
    //   />
    //   <ViroDirectionalLight direction={[0, 0, -1]} color="#ffffff" />

    //   <ViroAmbientLight color="#aaaaaa" />

    //   <ViroNode position={[0, 0, -1]}>
    //     <Viro3DObject
    //       source={resources.heartObj}
    //       materials={["heart"]}
    //       type="OBJ"
    //     />
    //   </ViroNode>
    //   <ViroText
    //     text="Heart"
    //     position={[0.0, 0.0, -3]}
    //     style={styles.helloWorldTextStyle}
    //     transformBehaviors={["billboardY"]}
    //   />
    // </ViroScene>
  );
};

export default () => {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: HelloWorldSceneAR,
      }}
      style={styles.f1}
    />
  );
};

// var materials = ViroMaterials.createMaterials({
//   heart: {
//     lightingModel: "Blinn",
//     diffuseTexture: resources.gridBg,
//     specularTexture: resources.gridBg,
//     writesToDepthBuffer: true,
//     readsFromDepthBuffer: true,
//   },
// });

var styles = StyleSheet.create({
  f1: { flex: 1 },
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center",
  },
});
