import React, { useRef, useEffect } from "react";
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    Animated,
    Platform,
    LogBox,
    Modal,
} from 'react-native';
import { VictoryPie } from 'victory-native';

import {Svg} from 'react-native-svg';

import { COLORS, FONTS, SIZES, icons } from '../constants';

const Home = () => {

    const confirmStatus = "C"
    const pendingStatus = "P"



    let categoriesData = [
        {
            id: 1,
            name: "Education",
            icon: icons.education, // icons[category.name.toLowerCase()]
            color: 'orange',
            expenses: [
                {
                    id: 1,
                    title: "School loan",
                    description: "Monthly Balance",
                    location: "Flatiron School",
                    total: 275.70,
                    status: pendingStatus
                },
                {
                    id: 2,
                    title: "Adobe Creative Suite",
                    description: "Monthly Subscription",
                    location: "Adobe.com",
                    total: 30.00,
                    status: pendingStatus
                },
                {
                    id: 3,
                    title: "Javascript Books",
                    description: "Javascript books",
                    location: "Amazon.com",
                    total: 20.00,
                    status: confirmStatus
                },
            ],
        },
        {
            id: 2,
            name: "Food",
            icon: icons.food,
            color: COLORS.blue,
            expenses: [
                {
                    id: 5,
                    title: "Groceries",
                    description: "Grocery Trip #1",
                    location: "Costco",
                    total: 98.12,
                    status: pendingStatus,
                },

                {
                    id: 6,
                    title: "Groceries",
                    description: "Grocery Trip #2",
                    location: "King Soopers",
                    total: 52.92,
                    status: confirmStatus,
                },

            ],
        },
        {
            id: 3,
            name: "Subscriptions",
            icon: icons.subscription,
            color: COLORS.darkgreen,
            expenses: [
                {
                    id: 7,
                    title: "Gym Membership",
                    description: "Monthly Fee",
                    location: "Planet Fitness",
                    total: 10.99,
                    status: confirmStatus,
                },
                {
                    id: 8,
                    title: "Spotify",
                    description: "Monthly Subscription",
                    location: "Spotify Inc.",
                    total: 9.99,
                    status: pendingStatus,
                },
                {
                    id: 9,
                    title: "World of Warcraft",
                    description: "Monthly Subscription",
                    location: "Battle.net",
                    total: 10.99,
                    status: pendingStatus,
                },
                {
                    id: 10,
                    title: "Netflix Premium",
                    description: "Monthly Subscription",
                    location: "Netflix.com",
                    total: 17.99,
                    status: pendingStatus,
                },
            ],
        },
        {
            id: 4,
            name: "Utilities",
            icon: icons.house,
            color: 'pink',
            expenses: [
                {
                    id: 11,
                    title: "Rent",
                    description: "Monthly Bill",
                    location: "Denver",
                    total: 1750.00,
                    status: pendingStatus,
                },
                {
                    id: 12,
                    title: "Electricity Bill",
                    description: "Xcel Energy",
                    location: "Denver",
                    total: 50.00,
                    status: confirmStatus,
                },
                {
                    id: 13,
                    title: "Water Bill",
                    description: "Monthly Bill",
                    location: "Denver Water",
                    total: 17.05,
                    status: confirmStatus,
                },
                {
                    id: 14,
                    title: "Pest Control",
                    description: "Monthly Bill",
                    location: "Denver",
                    total: 5.00,
                    status: confirmStatus,
                },
            ],
        },
        {
            id: 5,
            name: "Car & Gas",
            icon: icons.car,
            color: COLORS.purple,
            expenses: [
                {
                    id: 15,
                    title: "Car Insurance",
                    description: "Monthly Fee",
                    location: "Statefarm",
                    total: 97.17,
                    status: pendingStatus,
                },
                {
                    id: 16,
                    title: "Gas",
                    description: "Monthly Fee",
                    location: "Costco Gasoline",
                    total: 100.12,
                    status: confirmStatus,
                },
            ],
        },
        {
            id: 6,
            name: "Clothing",
            icon: icons.cloth_icon,
            color: COLORS.red,
            expenses: [
                {
                    id: 17,
                    title: "T-Shirt",
                    description: "Plain Color T-Shirt",
                    location: "Uniqlo",
                    total: 20.00,
                    status: pendingStatus,
                },
                {
                    id: 18,
                    title: "Jeans",
                    description: "Blue Jeans",
                    location: "Levi's",
                    total: 50.00,
                    status: confirmStatus,
                },
            ],
        }
    ]

    useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])

    const categoryListHeightAnimationValue = useRef(new Animated.Value(115)).current;

    const [categories, setCategories] = React.useState(categoriesData)
    const [viewMode, setViewMode] = React.useState("chart")
    const [selectedCategory, setSelectedCategory] = React.useState(null)
    const [showMoreToggle, setShowMoreToggle] = React.useState(false)
    const [showModal, setShowModal] = React.useState(false)

    function renderModal() {
        return (
            <Modal transparent={true} visible={showModal} onRequestClose={() => setShowModal(false)}>
                <View style={{flex: 1, backgroundColor: '#00000080', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: 'white'}}> Sup homie</Text>
                    <TouchableOpacity onPress={() => setShowModal(false)} style={{backgroundColor: 'red'}}>
                            <Text>Sup</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        )
    }

    function renderHeader() {

        let chartData = categories.map((item) => {
            let confirmExpenses = item.expenses.filter(a => a.status == "C")
            let total = confirmExpenses.reduce((a, b) => a + (b.total || 0), 0)

            return {
                name: item.name,
                y: total,
                expenseCount: confirmExpenses.length,
                color: item.color,
                id: item.id
            }
        })

        let filterChartData = chartData.filter(a => a.y > 0)
        let totalExpense = filterChartData.reduce((a, b) => a + (b.y || 0), 0)

        return (
            <View style={{ paddingHorizontal: SIZES.padding, paddingVertical: SIZES.padding, backgroundColor: COLORS.white }}>
                <View style={{ paddingTop: 30}}>
                    <Text style={{ color: 'black', ...FONTS.h2, paddingBottom: 10 }}>Expenses</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{ color: 'black', ...FONTS.h1}}t>${totalExpense.toFixed(2)}</Text>
                        <TouchableOpacity onPress={() => setShowModal(true)}>
                            <Image 
                                source={icons.add}
                                style={{width: 35, height: 35}}>
                            </Image>
                        </TouchableOpacity>
                    </View>
            </View>

                <View style={{ flexDirection: 'row', marginTop: SIZES.padding, alignItems: 'center' }}>
                    <View style={{
                        backgroundColor: COLORS.lightGray,
                        height: 50,
                        width: 50,
                        borderRadius: 25,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Image
                            source={icons.calendar}
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: COLORS.lightBlue
                            }}
                        />
                    </View>

                    <View style={{ marginLeft: SIZES.padding }}>
                        <Text style={{ color: COLORS.primary, ...FONTS.h3 }}>August 5, 2021</Text>
                        <Text style={{ ...FONTS.body3, color: COLORS.darkgray }}>17% more than last month</Text>
                    </View>
                </View>
            </View>
        )
    }

    function renderCategoryHeaderSection() {
        return (
            <View style={{ flexDirection: 'row', padding: SIZES.padding, justifyContent: 'space-between', alignItems: 'center' }}>
                <View>
                    <Text style={{ color: COLORS.primary, ...FONTS.h3 }}>CATEGORIES</Text>
                    <Text style={{ color: COLORS.darkgray, ...FONTS.body4 }}>{categories.length} Total</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: viewMode == "chart" ? COLORS.secondary : null,
                            height: 50,
                            width: 50,
                            borderRadius: 25
                        }}
                        onPress={() => setViewMode("chart")}
                    >
                        <Image
                            source={icons.chart}
                            resizeMode="contain"
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: viewMode == "chart" ? COLORS.white : COLORS.darkgray,
                            }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: viewMode == "list" ? COLORS.secondary : null,
                            height: 50,
                            width: 50,
                            borderRadius: 25,
                            marginLeft: SIZES.base
                        }}
                        onPress={() => setViewMode("list")}
                    >
                        <Image
                            source={icons.menu}
                            resizeMode="contain"
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: viewMode == "list" ? COLORS.white : COLORS.darkgray,
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    function renderCategoryList() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                onPress={() => setSelectedCategory(item)}
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    margin: 5,
                    paddingVertical: SIZES.radius,
                    paddingHorizontal: SIZES.padding,
                    borderRadius: 5,
                    backgroundColor: COLORS.white,
                    ...styles.shadow
                }}
            >
                <Image
                    source={item.icon}
                    style={{
                        width: 25,
                        height: 25,
                        tintColor: item.color
                    }}
                />
                <Text style={{ marginLeft: SIZES.base, color: COLORS.primary, ...FONTS.h4 }}>{item.name}</Text>
            </TouchableOpacity>
        )

        return (
            <View style={{ paddingHorizontal: SIZES.padding - 5 }}>
                <Animated.View style={{ height: categoryListHeightAnimationValue }}>
                    <FlatList
                        data={categories}
                        renderItem={renderItem}
                        keyExtractor={item => `${item.id}`}
                        numColumns={2}
                    />
                </Animated.View>

                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        marginVertical: SIZES.base,
                        justifyContent: 'center'
                    }}
                    onPress={() => {
                        if (showMoreToggle) {
                            Animated.timing(categoryListHeightAnimationValue, {
                                toValue: 115,
                                duration: 500,
                                useNativeDriver: false
                            }).start()
                        } else {
                            Animated.timing(categoryListHeightAnimationValue, {
                                toValue: 172.5,
                                duration: 500,
                                useNativeDriver: false
                            }).start()
                        }

                        setShowMoreToggle(!showMoreToggle)
                    }}
                >
                    <Text style={{ ...FONTS.body4 }}>{showMoreToggle ? "LESS" : "MORE"}</Text>
                    <Image
                        source={showMoreToggle ? icons.up_arrow : icons.down_arrow}
                        style={{ marginLeft: 5, width: 15, height: 15, alignSelf: 'center' }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    function renderIncomingExpensesTitle() {
        return (
            <View style={{ height: 80, width: '55%', backgroundColor: COLORS.lightGray2, padding: SIZES.padding }}>
                <Text style={{ ...FONTS.h3, color: COLORS.primary }}>INCOMING EXPENSES</Text>
                <Text style={{ ...FONTS.body4, color: COLORS.darkgray }}>12 Total</Text>
            </View>
        )
    }

    function renderIncomingExpenses() {
        console.log("selected category", selectedCategory)
        let allExpenses = selectedCategory ? selectedCategory.expenses : []
        console.log("all expenses", allExpenses)
        let incomingExpenses = allExpenses.filter(a => a.status == "P")
        

        function confirmIncomingExpenses(expense) {
            const confirmedExpense = {
                ...expense, status: "C"
            }
            const allOtherItems = allExpenses.filter(expense => expense.id !== confirmedExpense.id)
            const updatedCategory = {...selectedCategory, expenses: [...allOtherItems, confirmedExpense]}
            setSelectedCategory(updatedCategory)
            const allOtherCategories = categories.filter(category => category.id !== updatedCategory.id)
            setCategories([...allOtherCategories, updatedCategory])
        }

        const renderItem = ({ item, index }) => (
            <View style={{
                width: 300,
                marginRight: SIZES.padding,
                marginLeft: index == 0 ? SIZES.padding : 0,
                marginVertical: SIZES.radius,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.white,
                ...styles.shadow
            }}>
                <View style={{ flexDirection: 'row', padding: SIZES.padding, alignItems: 'center' }}>
                    <View
                        style={{
                            height: 50,
                            width: 50,
                            borderRadius: 25,
                            backgroundColor: COLORS.lightGray,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: SIZES.base
                        }}
                    >
                        <Image
                            source={selectedCategory.icon}
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: selectedCategory.color
                            }}
                        />
                    </View>

                    <Text style={{ ...FONTS.h3, color: selectedCategory.color, }}>{selectedCategory.name}</Text>
                </View>

                <View style={{ paddingHorizontal: SIZES.padding }}>
                    <Text style={{ ...FONTS.h2, }}>{item.title}</Text>
                    <Text style={{ ...FONTS.body3, flexWrap: 'wrap', color: COLORS.darkgray }}>
                        {item.description}
                    </Text>

                    <Text style={{ marginTop: SIZES.padding, ...FONTS.h4, }}>Location</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            source={icons.pin}
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: COLORS.darkgray,
                                marginRight: 5
                            }}
                        />
                        <Text style={{ marginBottom: SIZES.base, color: COLORS.darkgray, ...FONTS.body4 }}>{item.location}</Text>
                    </View>
                </View>

                <View
                    style={{
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderBottomStartRadius: SIZES.radius,
                        borderBottomEndRadius: SIZES.radius,
                        backgroundColor: selectedCategory.color,
                    }}
                >
                    <TouchableOpacity onPress={() => confirmIncomingExpenses(item)}>
                        <Text style={{ color: COLORS.white, ...FONTS.body3 }}>CONFIRM {item.total.toFixed(1)} USD</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )

        return (
            <View>
                {renderIncomingExpensesTitle()}
                {
                    incomingExpenses.length > 0 &&
                    <FlatList
                        data={incomingExpenses}
                        renderItem={renderItem}
                        keyExtractor={item => `${item.id}`}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                }

                {
                    incomingExpenses.length == 0 &&
                    <View style={{ alignItems: 'center', justifyContent: 'center', height: 300 }}>
                        <Text style={{ color: COLORS.primary, ...FONTS.h3 }}>No Record</Text>
                    </View>
                }

            </View>

        )
    }

    function processCategoryDataToDisplay() {
        let chartData = categories.map((item) => {
            let confirmExpenses = item.expenses.filter(a => a.status == "C")
            var total = confirmExpenses.reduce((a, b) => a + (b.total || 0), 0)

            return {
                name: item.name,
                y: Math.round(total * 1e2) / 1e2,
                expenseCount: confirmExpenses.length,
                color: item.color,
                id: item.id
            }
        })

        let filterChartData = chartData.filter(a => a.y > 0)



        let totalExpense = filterChartData.reduce((a, b) => a + (b.y || 0), 0)

        let finalChartData = filterChartData.map((item) => {
            let percentage = (item.y / totalExpense * 100).toFixed(0)
            return {
                label: `${percentage}%`,
                y: Number(item.y),
                expenseCount: item.expenseCount,
                color: item.color,
                name: item.name,
                id: item.id
            }
        })

        return finalChartData
    }

    function setSelectCategoryByName(name) {
        let category = categories.filter(a => a.name == name)
        setSelectedCategory(category[0])
    }

    function renderChart() {

        let chartData = processCategoryDataToDisplay()
        let colorScales = chartData.map((item) => item.color)
        let totalExpenseCount = chartData.reduce((a, b) => a + (b.expenseCount || 0), 0)

        if(Platform.OS == 'ios')
        {
            return (
                <View  style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <VictoryPie
                        
                        data={chartData}
                        labels={(datum) => `${datum.y}`}
                        radius={({ datum }) => (selectedCategory && selectedCategory.name == datum.name) ? SIZES.width * 0.4 : SIZES.width * 0.4 - 10}
                        innerRadius={70}
                        labelRadius={({ innerRadius }) => (SIZES.width * 0.4 + innerRadius) / 2.5}
                        style={{
                            labels: { fill: "white", ...FONTS.body3 },
                            parent: {
                                ...styles.shadow
                            },
                        }}
                        width={SIZES.width * 0.8}
                        height={SIZES.width * 0.8}
                        colorScale={colorScales}
                        events={[{
                            target: "data",
                            eventHandlers: {
                                onPress: () => {
                                    return [{
                                        target: "labels",
                                        mutation: (props) => {
                                            let categoryName = chartData[props.index].name
                                            setSelectCategoryByName(categoryName)
                                        }
                                    }]
                                }
                            }
                        }]}
    
                    />
    
                    <View style={{ position: 'absolute', top: '42%', left: "42%" }}>
                        <Text style={{ ...FONTS.h1, textAlign: 'center' }}>{totalExpenseCount}</Text>
                        <Text style={{ ...FONTS.body3, textAlign: 'center' }}>Expenses</Text>
                    </View>
                </View>
    
            )
        }
        else
        {
            return (
                <View  style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Svg width={SIZES.width} height={SIZES.width} style={{width: "100%", height: "auto"}}>

                        <VictoryPie
                            standalone={false}
                            data={chartData}
                            labels={(datum) => `${datum.y}`}
                            radius={({ datum }) => (selectedCategory && selectedCategory.name == datum.name) ? SIZES.width * 0.4 : SIZES.width * 0.4 - 10}
                            innerRadius={70}
                            labelRadius={({ innerRadius }) => (SIZES.width * 0.4 + innerRadius) / 2.5}
                            style={{
                                labels: { fill: "white", ...FONTS.body3 },
                                parent: {
                                    ...styles.shadow
                                },
                            }}
                            width={SIZES.width}
                            height={SIZES.width}
                            colorScale={colorScales}
                            events={[{
                                target: "data",
                                eventHandlers: {
                                    onPress: () => {
                                        return [{
                                            target: "labels",
                                            mutation: (props) => {
                                                let categoryName = chartData[props.index].name
                                                setSelectCategoryByName(categoryName)
                                            }
                                        }]
                                    }
                                }
                            }]}
        
                        />
                    </Svg>
                    <View style={{ position: 'absolute', top: '42%', left: "42%" }}>
                        <Text style={{ ...FONTS.h1, textAlign: 'center' }}>{totalExpenseCount}</Text>
                        <Text style={{ ...FONTS.body3, textAlign: 'center' }}>Expenses</Text>
                    </View>
                </View>
            )
        }
        
    }

    function renderExpenseSummary() {
        
        let data = processCategoryDataToDisplay()

        const renderItem = ({ item }) => (
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    height: 40,
                    paddingHorizontal: SIZES.radius,
                    borderRadius: 10,
                    backgroundColor: (selectedCategory && selectedCategory.name == item.name) ? item.color : COLORS.white
                }}
                onPress={() => {
                    let categoryName = item.name
                    setSelectCategoryByName(categoryName)
                }}
            >
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <View
                        style={{
                            width: 20,
                            height: 20,
                            backgroundColor: (selectedCategory && selectedCategory.name == item.name) ? COLORS.white : item.color,
                            borderRadius: 5
                        }}
                    />

                    <Text style={{ marginLeft: SIZES.base, color: (selectedCategory && selectedCategory.name == item.name) ? COLORS.white : COLORS.primary, ...FONTS.h3 }}>{item.name}</Text>
                </View>

                <View style={{ justifyContent: 'center' }}>
                    <Text style={{ color: (selectedCategory && selectedCategory.name == item.name) ? COLORS.white : COLORS.primary, ...FONTS.h3 }}>{item.y} USD - {item.label}</Text>
                </View>
            </TouchableOpacity>
        )

        return (
            <View style={{ padding: SIZES.padding }}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => `${item.id}`}
                />
            </View>

        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.lightGray2 }}>
            {renderHeader()}
            {renderCategoryHeaderSection()}
            {renderModal()}
            <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
                {
                    viewMode == "list" &&
                    <View>
                        {renderCategoryList()}
                        {renderIncomingExpenses()}
                    </View>
                }
                {
                    viewMode == "chart" &&
                    <View>
                        {renderChart()}
                        {renderExpenseSummary()}
                    </View>
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
    }
})

export default Home;