export const useLocations = async () : Promise<any> => {
    const result = useState('locations')
    if(!result.value) {
        const { public:config } = useRuntimeConfig()
        const {data, error} = await useFetch<{data:null|[]|[any]}>( config.VUE_APP_API_URL+'/locations')
        if(data.value && data.value.data) {
            const value = {
                all: data.value.data,
                ids: {} as null | any,
                slugs: {} as null | any,
            }
            data.value.data.forEach(val => {
                value.ids[val.id] = val
                value.slugs[val.slug] = val
            })
            result.value = value
        }
    }
    return result
  }
  