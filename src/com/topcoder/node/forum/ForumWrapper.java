/**
 * Copyright (C) 2014 TopCoder Inc., All Rights Reserved.
 */
package com.topcoder.node.forum;

import com.topcoder.web.ejb.forums.Forums;
import com.topcoder.web.ejb.forums.ForumsHome;

import javax.naming.Context;
import javax.naming.InitialContext;
import java.util.Properties;

/**
 * <p>
 * Wrapper class to communicate with ForumEJB.
 * </p>
 *
 * <p>
 * Version 1.1 - Fix the issue that if jboss is restarted, the ForumWrapper is no longer usable, and the API call will be problem.
 * <ul>
 * <li>Updated {@link #getForumsInstance(String, Boolean)} method, add param forceInit to control whether force to init the forumService</li>
 * </ul>
 * </p>
 *
 * @author freegod, bugbuka
 * @version 1.1
 * @since 1.0
 */
public class ForumWrapper {

    /**
     * Stands for the default forum host.
     */
    private static final String DEFAULT_FORUM_HOST = "jnp://env.topcoder.com:1199";

    /**
     * Stands for the forum ejb retrieved via JNDI.
     */
    private static Forums forumService;

    /**
     * <p>
     *     Retrieve EJB via JNDI and initialize this wrapper.
     * </p>
     * @param forumHost
     *          stands for the forum host
     * @throws Exception
     *          if any error occurs
     */
    private static void init(String forumHost) throws Exception {
        Properties jndiProps = new Properties();
        jndiProps.put(Context.INITIAL_CONTEXT_FACTORY, "org.jnp.interfaces.NamingContextFactory");
        jndiProps.put(Context.URL_PKG_PREFIXES, "org.jboss.naming:org.jnp.interfaces");
        jndiProps.put(Context.PROVIDER_URL, forumHost);
        Context context = new InitialContext(jndiProps);

        ForumsHome forumsHome = (ForumsHome) context.lookup(ForumsHome.EJB_REF_NAME);
        forumService = forumsHome.create();
    }

    /**
     * <p>
     *     Return <code>Forums</code> instance.
     * </p>
     *
     * @param forumHost
     *          stands for the forum host
     * @param forceInit
     *          if true, do init forumService.
     * @return
     *          <code>Forums</code> instance
     * @throws Exception
     *          if any error occurs
     */
    public static Forums getForumsInstance(String forumHost, boolean forceInit) throws Exception {
        if (null == forumHost) {
            forumHost = DEFAULT_FORUM_HOST;
        }
        if (null == forumService || forceInit) {
            init(forumHost);
        }
        return forumService;
    }

}
