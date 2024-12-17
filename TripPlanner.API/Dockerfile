FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["TripPlanner.API.csproj", "./"]
RUN dotnet restore "TripPlanner.API.csproj"
COPY . .
RUN dotnet build "TripPlanner.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "TripPlanner.API.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .
EXPOSE 80
ENTRYPOINT ["dotnet", "TripPlanner.API.dll"]