import { Text, View,Image, ScrollView, ActivityIndicator, FlatList } from "react-native";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/searchBar";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { FetchMovies } from "@/services/api";
import MovieCard from "@/components/movieCard";


export default function Index() {
  const router = useRouter();

  const {
    data:movies, 
    loading:moviesLoading,
  error:moviesError 
}= useFetch(()=> FetchMovies({
    query: "",
  }))

  return (
    <View className='flex-1 bg-primary' >
      <Image source={images.bg} className='w-full z-0 absolute' />

      <ScrollView className='flex-1 px-5' showsVerticalScrollIndicator={false}
       contentContainerStyle={{minHeight: "100%", paddingBottom: 10}}>

        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

      {moviesLoading ? (<ActivityIndicator 
                      size="large" 
                      color="#0000ff" 
                      className="mt-10 self-center"
                      />) : moviesError? (<Text>Erro ao buscar filmes</Text>) : 
                      (<View className="flex-1 mt-5">
                        <SearchBar
                        onPress={() => router.push("/search")}
                        placeholder="Procure por um filme"
                        />

                        <>
                        <Text className=" text-lg font-bold mt-5 text-white mb-3">Ultimos lançamentos</Text>

                          <FlatList
                          data={movies}
                          renderItem={({item}) => (
                            <MovieCard 
                            {...item}
                            />
                          )} 
                          keyExtractor={(item) => item.id.toString()}
                          numColumns={3}
                          columnWrapperStyle={{
                            justifyContent: "flex-start",
                            gap: 20,
                            paddingRight: 5,
                            marginBottom: 10,
                          }}

                          className="mt-2 pb-32"
                          scrollEnabled={false}
                          />


                        </>
              
                      </View>)}

        
        </ScrollView>

    
      
    
    </View>
  );
}