import { Rings } from "../views/Ring";
import { Create } from "../views/Ring";
interface IRoute{
    routeName:string;
    setRoute:Function;
    params:any,
    setParams:Function
}

export default ({routeName,setRoute,params,setParams}:IRoute)=>{

    const GetCurrentRouteView = ()=>{
        
        const mapRoutes:any = {
            main:<Rings setRoute={setRoute} setParams={setParams} />,
            create:<Create setRoute={setRoute} params={params} setParams={setParams}/>
        }
        return mapRoutes[routeName] ?? <>Rota nao encontrada</>


    } 

    return GetCurrentRouteView()
}