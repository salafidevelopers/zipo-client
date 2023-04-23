import HeadComponent from '../components/Head';

const PageNotFound = () => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center py-2'>
      <HeadComponent title={'Not Found'} />
      <main className='flex w-full flex-1 flex-col items-center justify-center px-20 text-center'>
        Nothing Here
      </main>

      <footer className='flex h-24 w-full items-center justify-center border-t'>
        Empty
      </footer>
    </div>
  );
};

export default PageNotFound;
