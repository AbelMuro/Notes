/* 
            INTEGRATING TYPESCRIPT WITH REDUX

                        1) In your store.tsx file, update the following lines of code

                                    import { configureStore } from "@reduxjs/toolkit";
                                    import {useDispatch, TypedUseSelectorHook, useSelector} from 'react-redux';
                                    import rootReducer from "./Reducers";
                                    
                                    const Store = configureStore({
                                        reducer: rootReducer
                                    });
                                    
                                    type RootState = ReturnType<typeof Store.getState>;
                                    type TypedDispatch = typeof Store.dispatch;
                                    
                                    const useTypedDispatch = () => useDispatch<TypedDispatch>();
                                    const useTypedSelector : TypedUseSelectorHook<RootState> = useSelector;
                                    
                                    export {useTypedDispatch, useTypedSelector};
                                    export default Store;

                        2) In your index.js file, update the following lines of code

                                    import Store, {useTypedDispatch, useTypedSelector} from './Store.tsx';
                                    
                                    export {useTypedDispatch, useTypedSelector}
                                    export default Store;

                        3) In your reducer, make sure to create cases similar to the one below
                                    import { PayloadAction } from '@reduxjs/toolkit'

                                    .addCase(showPopup, (state, action: PayloadAction<string>) => {                       
                                            state.open = true;
                                            state.message = action.payload;
                                    })

                        3) useTypedSelector();

                                    function App() {
                                          const open = useTypedSelector<boolean>(state => state.popup.open);
                                    }

                        4) useTypedDispatch();

                                    function App() {
                                        const dispatch = useTypedDispatch();
                                    }
*/
