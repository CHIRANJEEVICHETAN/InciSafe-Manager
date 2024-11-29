import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { Card } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './../../../configs/FirebaseConfig';
import { useRouter } from 'expo-router';

const StatCard = ({ title, value }) => (
  <Card style={styles.statCard}>
    <Card.Content>
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </Card.Content>
  </Card>
);

const screenWidth = Dimensions.get('window').width;

export default function AdminDashboard() {
  const [totalIncidents, setTotalIncidents] = useState(0);
  const [activeIncidents, setActiveIncidents] = useState(0);
  const [resolvedIncidents, setResolvedIncidents] = useState(0);
  const [notificationsSent, setNotificationsSent] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [chartType, setChartType] = useState('bar');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = [
          'BehaviourIncident',
          'ChemicalIncident',
          'EnvironmentalHazard',
          'EquipmentIssues',
          'FireIncident',
          'HealthSafety',
          'PolicyViolation',
          'WeatherHazards',
          'uniformSafety',
        ];

        let total = 0;
        let active = 0;
        let resolved = 0;
        let notifications = 0;
        let chartDataArray = [];

        for (const category of categories) {
          const querySnapshot = await getDocs(collection(db, category));
          let categoryCount = 0;

          querySnapshot.forEach((doc) => {
            const data = doc.data();
            categoryCount++;

            if (data.status === 'active') {
              active++;
            } else if (data.status === 'resolved') {
              resolved++;
            }

            if (data.notificationSent) {
              notifications++;
            }
          });

          total += categoryCount;

          chartDataArray.push({
            name: category,
            count: categoryCount,
            color: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`,
            legendFontColor: '#7F7F7F',
            legendFontSize: 12,
          });
        }

        setTotalIncidents(total);
        setActiveIncidents(active);
        setResolvedIncidents(resolved);
        setNotificationsSent(notifications);
        setChartData(chartDataArray);
      } catch (error) {
        console.error('Error fetching incident data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.7,
    useShadowColorFromDataset: false,
  };

  const barChartData = {
    labels: chartData.map(item => item.name),
    datasets: [{
      data: chartData.map(item => item.count),
      colors: chartData.map(item => (opacity = 1) => item.color)
    }]
  };

  const pieChartData = chartData.map((item) => ({
    name: item.name,
    population: item.count,
    color: item.color,
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  }));


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
              accessibilityRole="button"
              accessibilityLabel="Go back"
            >
              <Image
                source={require("./../../../assets/images/back-button.png")}
                style={styles.backButtonImage}
              />
            </TouchableOpacity>
              <Text style={styles.header}>Admin Dashboard</Text>

              <View style={styles.statsContainer}>
                <StatCard title="Total Incidents" value={totalIncidents} />
                <StatCard title="Active Incidents" value={activeIncidents} />
                <StatCard title="Resolved Incidents" value={resolvedIncidents} />
                <StatCard title="Notifications Sent" value={notificationsSent} />
              </View>

              <View style={styles.chartButtonsContainer}>
                <TouchableOpacity
                  style={[styles.chartButton, chartType === 'bar' && styles.activeChartButton]}
                  onPress={() => setChartType('bar')}
                >
                  <Text style={[styles.chartButtonText, chartType === 'bar' && styles.activeChartButtonText]}>Bar Chart</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.chartButton, chartType === 'pie' && styles.activeChartButton]}
                  onPress={() => setChartType('pie')}
                >
                  <Text style={[styles.chartButtonText, chartType === 'pie' && styles.activeChartButtonText]}>Pie Chart</Text>
                </TouchableOpacity>
              </View>

              <Card style={styles.chartCard}>
                <Card.Content>
                  <Text style={styles.chartTitle}>
                    {chartType === 'bar' ? 'Incident Distribution (Bar Chart)' : 'Incident Distribution (Pie Chart)'}
                  </Text>
                  <Text style={styles.chartSubtitle}>Overview of incidents by category</Text>
                  {chartType === 'bar' ? (
                    <BarChart
                      data={barChartData}
                      width={screenWidth - 70}  // Increase width to fit more bars
                      height={250}
                      yAxisLabel=""
                      chartConfig={{
                        backgroundGradientFrom: '#f3e5f5',
                        backgroundGradientTo: '#e8eaf6',
                        color: (opacity = 1) => `rgba(63, 81, 181, ${opacity})`,
                        strokeWidth: 2,
                        barPercentage: 0.5,  // Further reduced bar percentage
                        useShadowColorFromDataset: false,
                        fillShadowGradientFrom: '#5e35b1',
                        fillShadowGradientTo: '#512da8',
                        fillShadowGradientOpacity: 0.8,
                        propsForBackgroundLines: {
                          strokeDasharray: '',
                          strokeWidth: 1,
                          stroke: 'rgba(128, 128, 128, 0.5)'
                        },
                        propsForLabels: {
                          fontFamily: 'sans-serif-medium',
                          fontWeight: '600'
                        }
                      }}
                      verticalLabelRotation={30}
                      showValuesOnTopOfBars={true}
                      fromZero={true}
                      style={styles.chart}
                    />
                  ) : (
                    <PieChart
                      data={pieChartData}
                        width={screenWidth - 25}
                      height={220}
                        chartConfig={chartConfig}
                        accessor="population"
                        backgroundColor="transparent"
                        paddingLeft="-3"
                        absolute
                        style={styles.chart}
                      />
                  )}
                </Card.Content>
              </Card>

              <View style={styles.legendContainer}>
                {chartData.map((item, index) => (
                  <View key={index} style={styles.legendItem}>
                    <View style={[styles.legendColor, { backgroundColor: item.color }]} />
                    <Text style={styles.legendText}>{item.name}</Text>
                  </View>
                ))}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 20,
  },
  backButton: {
    alignSelf: "flex-start",
    position: "absolute",
    left: 30,
    top: 0,
    zIndex: 1000,
  },
  backButtonImage: {
    width: 30,
    height: 30,
    marginTop: 23,
    zIndex: 1000,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    width: '48%',
    marginBottom: 10,
    elevation: 3,
  },
  statTitle: {
    fontSize: 14,
    color: '#666',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
  },
  chartButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  chartButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 10,
  },
  activeChartButton: {
    backgroundColor: '#007AFF',
  },
  chartButtonText: {
    fontSize: 16,
  },
  activeChartButtonText: {
    color: '#ffffff',
  },
  chartCard: {
    marginBottom: 20,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  chartSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  chart: {
    marginVertical: 8,
    // marginRight: 50,
    borderRadius: 16,
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    marginBottom: 10,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
    color: '#7F7F7F',
  },
});