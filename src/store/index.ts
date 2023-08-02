const modulesFiles = import.meta.glob('./modules/*.ts', { eager: true });

const modules = {} as any;
Object.keys(modulesFiles).forEach(modulePath => {
  const moduleName = modulePath.replace(/^\.\/modules\/(.*)\.\w+$/, "$1");
  modules[moduleName] = modulesFiles[modulePath]!.default;
})

export default function useStore(){
  return modules
}