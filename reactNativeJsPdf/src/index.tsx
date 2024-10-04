import React, {useRef} from 'react';
import {Alert, Button, SafeAreaView, Text, View} from 'react-native';
import RNEChartsPro from 'react-native-echarts-pro';
import WebView from 'react-native-webview';
import html_pdf_model from './components/model';
import {DocumentDirectoryPath, writeFile} from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';

const App = () => {
  const pdf_webview_ref = useRef<WebView>(null);
  const pieOption = {
    series: [
      {
        name: 'Source',
        type: 'pie',
        legendHoverLink: true,
        hoverAnimation: true,
        avoidLabelOverlap: true,
        startAngle: 180,
        radius: '55%',
        center: ['50%', '35%'],
        data: [
          {value: 105.2, name: 'android'},
          {value: 310, name: 'iOS'},
          {value: 234, name: 'web'},
        ],
        label: {
          normal: {
            show: true,
            textStyle: {
              fontSize: 12,
              color: '#23273C',
            },
          },
        },
      },
    ],
  };
  const mapData = {
    visualMap: {
      show: true,
      left: 'right',
      top: 'center',
      min: 1,
      max: 3,
      calculable: true,
    },
    geo: [
      {
        type: 'map',
        map: 'world',
        mapType: 'world',
        selectedMode: 'single',
        itemStyle: {
          normal: {
            areaStyle: {color: '#B1D0EC'},
            color: '#eeeeee',
            borderColor: '#dadfde',
          },
          emphasis: {
            //mouse hover style
            label: {
              show: true,
              textStyle: {
                color: '#000000',
              },
            },
          },
        },
        roam: true,
      },
    ],
    series: {
      type: 'effectScatter',
      coordinateSystem: 'geo',
      geoIndex: 0,
      itemStyle: {
        color: 'red',
      },
      data: [[116.4551, 40.2539, 10]],
    },
    toolbox: {
      show: true,
      orient: 'horizontal',
      x: 'left',
      y: 'bottom',
      backgroundColor: '#1e90ff60',
      itemGap: 10,
      itemSize: 10,
      color: '#ffffff',
      showTitle: false,
      feature: {
        restore: {
          show: true,
          title: 'Reset',
        },
      },
    },
  };

  const lineOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line',
      },
    ],
  };

  return (
    <SafeAreaView>
      <View>
        <View>
          <WebView
            ref={pdf_webview_ref}
            source={{html: html_pdf_model}}
            onMessage={async event => {
              const dir = DocumentDirectoryPath + '/Arquivo.pdf';

              await writeFile(dir, event.nativeEvent.data, 'ascii')
                .then(async () => {
                  await FileViewer.open(dir).catch(() => {
                    Alert.alert(
                      'Alerta!',
                      'Não foi possível gerar o arquivo PDF.',
                    );
                  });
                })
                .catch(() => {
                  Alert.alert(
                    'Alerta!',
                    'Não foi possível gerar o arquivo PDF.',
                  );
                });
            }}
          />
        </View>
        <Text>app</Text>

        <Button
          title="Gerar PDF"
          onPress={() => {
            pdf_webview_ref.current!.injectJavaScript('gen_output_pdf();');
          }}
        />
        <RNEChartsPro height={250} option={pieOption} />
        <RNEChartsPro height={250} option={mapData} />
        <RNEChartsPro height={250} option={lineOption} />
      </View>
    </SafeAreaView>
  );
};

export default App;
