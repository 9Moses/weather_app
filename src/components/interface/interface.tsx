export interface WeatherDataProps {
  name: string;

  main: {
    temp: string;
    humidity: number;
  };

  sys: {
    country: string;
  };
  weather: {
    main: string;
  }[];
  wind: {
    speed: number;
  };
}
