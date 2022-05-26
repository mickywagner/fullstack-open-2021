import { useDispatch} from "react-redux"
import { updateFilter } from "../reducers/filterReducer"

const Filter = () => {
  const dispatch = useDispatch()
  
  const style = {
   marginBottom: 10,
   marginTop: 10
  }

  const handleChange = (event) => {
      event.preventDefault()
      dispatch(updateFilter(event.target.value))
  }

  return (
    <div style={style}>
        filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter