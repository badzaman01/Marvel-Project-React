import React from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import {
  chooseName,
  chooseDescription,
  chooseComicsAppearedIn,
  chooseSuperPower,
} from "../../redux/slices/rootSlice";
import { Input } from "../sharedComponents/Input";
import { serverCalls } from "../../api";
import { useGetData } from "../../custom-hooks";

interface MarvelFormProps {
  id?: string;
  data?: {};
}

interface MarvelState {
  name: string;
  description: string;
  comics_appeared_in: string;
  super_power: string;
}

export const MarvelForm = (props: MarvelFormProps) => {
  const dispatch = useDispatch();
  let { marvelData, getData } = useGetData();
  const store = useStore();
  const name = useSelector<MarvelState>((state) => state.name);
  const description = useSelector<MarvelState>((state) => state.description);
  const comics_appeared_in = useSelector<MarvelState>(
    (state) => state.comics_appeared_in
  );
  const super_power = useSelector<MarvelState>((state) => state.super_power);
  const { register, handleSubmit } = useForm({});

  const onSubmit = async (data: any, event: any) => {
    console.log(props.id);

    if (props.id!) {
      await serverCalls.update(props.id!, data);
      console.log(`Updated:${data} ${props.id}`);
      window.location.reload();
      event.target.reset();
    } else {
      dispatch(chooseName(data.name));
      dispatch(chooseDescription(data.description));
      dispatch(chooseComicsAppearedIn(data.comics_appeared_in));
      dispatch(chooseSuperPower(data.super_power));
      await serverCalls.create(store.getState());
      window.location.reload();
      event.target.reset();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Hero Name</label>
          <Input {...register("name")} name="name" placeholder="Name" />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <Input
            {...register("description")}
            name="description"
            placeholder="Description"
          />
        </div>
        <div>
          <label htmlFor="comics_appeared_in">Comics Appeared In</label>
          <Input
            {...register("comics_appeared_in")}
            name="comics_appeared_in"
            placeholder="Comics Appeared In"
          />
        </div>
        <div>
          <label htmlFor="super_power">Super Power</label>
          <Input
            {...register("super_power")}
            name="super_power"
            placeholder="Super Power"
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};
