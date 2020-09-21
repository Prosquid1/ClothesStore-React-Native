# ClothesStore (React-Native)
RNHome is a React Native implementation and mixed-code integration of the [ClothesStore-iOS](https://github.com/Prosquid1/ClothesStore-iOS) project

![App Demo Gif](https://user-images.githubusercontent.com/13585693/93754952-68fc9180-fbfa-11ea-9b4f-1af41a6e64eb.gif)


#### Data Fetching Procedure:

Subclassed [DataSourcePresenter](https://github.com/Prosquid1/ClothesStore-iOS/blob/master/ClothesStore/Generic/Presenter/DataSourcePresenter.swift) to HomePresenter to interact with the bridge
as DataSourcePresenter initially served as a base presenter which did all the fetching based on the inferred model type.

#### Bundling:
Bundle resources with the command below
```script
react-native bundle --entry-file='./index.js' --bundle-output='./main.jsbundle' --dev=false --platform='ios' --assets-dest='./ios'
```

If you want to hot reload with active changes, in [HomeController.swift](https://github.com/Prosquid1/ClothesStore-iOS/blob/master/ClothesStore/Home/HomeController.swift), change the jsCodeLocation to your local environment 
```swift
let jsCodeLocation = URL(string: "http://localhost:8081/index.bundle?platform=ios")!

```

#### Note:
1.[main.jsbundle](https://github.com/Prosquid1/ClothesStore-React-Native/blob/master/main.jsbundle) was deliberately added to avoid re-bundling and for those who want to directly run from Xcode without having to do any major setup.

2.The backend was designed in a way that certain REST requests had to be chained, hence the full refresh in some controllers.
