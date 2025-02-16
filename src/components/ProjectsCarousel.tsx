import Carousel, {
  Slider,
  SliderContainer,
  ThumsSlider,
} from '@/components/ui/carousel';
import { projects } from '@/lib/projectsData';
import { ShinyButton } from './ui/shiny-button';
import { Github } from 'lucide-react';


export default function ProjectsCarousel() {
  const OPTIONS = { loop: false };
  return (
    <>
      <div className=' lg:w-[95%]  sm:w-[80%] w-[90%] mx-auto '>
        <Carousel options={OPTIONS} className=' relative' >
          <SliderContainer className='gap-2'>
            {
              projects.map((project) => (
                <Slider
                  className='xl:h-[40rem] sm:h-[350px] h-[300px] w-full bg-card/80 rounded-xl  flex items-center '
                  thumnailSrc={project.thumbnail}
                  key={project.name}
                >
                  <img
                    src={project.image}
                    width={1400}
                    height={800}
                    alt='img'
                    className='h-full object-cover  w-[30%] border-r border-accent'
                  />
                  <div className='flex mx-4 w-[70%] flex-col justify-between h-full py-4'>
                    <div className='flex flex-col gap-4'>
                      <h1 className='text-2xl font-bold text-card-foreground'>
                        {project.name}
                        <span className='text-2xl'>
                          {project.domain}
                        </span>
                      </h1>
                      <p className='text-base text-balance text-secondary-foreground'>{project.description}</p>
                      <ul className='*:list-outside'>
                        {
                          project.features.map((feat) => (
                            <li key={feat} className='text-base text-secondary-foreground rounded-md flex gap-1'>
                              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor"><path d="m14.75 7.784l1.414-1.415l4.242 4.243l-4.242 4.243l-1.415-1.415l2.829-2.828z" /><path d="m10.507 13.44l1.414 1.415l4.243-4.243L11.92 6.37l-1.414 1.415l1.847 1.846h-4.76a4 4 0 0 0-4 4v4h2v-4a2 2 0 0 1 2-2h4.723z" /></g></svg><span>
                                {feat}
                              </span>
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                    <div className='flex justify-between items-center'>
                      <div className='flex gap-2'>
                        {
                          project.technologies.map((tech) => (
                            <img
                              src={`https://skillicons.dev/icons?i=${tech}`}
                              alt={tech}
                              className="h-14 w-14"
                            />
                          ))
                        }
                      </div>
                      <div className='flex gap-2 items-center'>
                        {
                          project.sourceCode && (
                            <a href={project.sourceCode}>
                              <ShinyButton childrenClassName='!flex gap-2'>
                                <Github className='h-6 w-6' />
                                <span>
                                  Source Code
                                </span>
                              </ShinyButton>
                            </a>
                          )
                        }
                        {
                          project.link && (
                            <a href={project.link}>
                              <ShinyButton>
                                <span>
                                  Visit It
                                </span>
                              </ShinyButton>
                            </a>
                          )
                        }
                      </div>
                    </div>
                  </div>
                </Slider>
              ))
            }
          </SliderContainer>
          <ThumsSlider />
        </Carousel>
      </div>
    </>
  );
}


