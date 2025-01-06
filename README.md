# Kubiru

![Cluster Page](./images/Kubiru.png)


## About Kubiru
Manage your Kubernetes cluster easily


![Cluster Page](./images/cluster-page.png)

## Stack 
✅ Next JS (Backend) <br />
✅ TailwindCSS (Dashboard) <br />
✅ Kysely (ORM) <br />
✅ SQLite (Database) 

## Installation

Follow these steps to clone the repository and start the development server:

```sh
git clone https://github.com/takumade/k8-way.git
```

Then install dependencies:

```sh
npm install
```


Create a .env.local file by copying the example environment file: 

```sh
cp env.example.txt .env.local
```

Add the required environment variables to the .env.local file.

Then run the project:
```sh
npm run dev
```

You should now be able to access the application at http://localhost:3000.


## Migration

To migrate execute the following commands

```sh
npm i -D tsx
```

The run the following

```sh
npm run migrate
```

## Tokens
If you are using a local cluster, you can get the token by running the following command

```sh
microk8s kubectl create token default
```


## Todo

Query resource types
- [x] Deployments
- [x] Pods
- [x] Nodes
- [ ] Volumes
- [x] Namespaces
- [x] Services

Edit resource types
- [ ] Deployments
- [ ] Pods
- [ ] Volumes
- [ ] Namespaces
- [ ] Services

Delete resource types
- [ ] Deployments
- [ ] Pods
- [ ] Volumes
- [ ] Namespaces
- [ ] Services

Create resource types
- [ ] Deployments
- [ ] Pods
- [ ] Volumes
- [ ] Namespaces
- [ ] Services

Stats
- [ ] Whhat kinds of stats should we show
- [ ] Show the stats

Deployment
- [ ] Deployment docs
- [ ] Installation docs

## Contributing

Thank you for considering contributing to k8s project

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).


## License

K8-way is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
