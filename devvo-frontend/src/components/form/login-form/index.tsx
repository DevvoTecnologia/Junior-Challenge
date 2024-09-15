"use client";

import { GoldenButton } from "../../buttons/golden-button";
import { LoginFormDescription } from "./form-parts/login-form-description";
import { LoginFormRoot } from "./form-parts/login-form-root";
import { LoginFormTab } from "./form-parts/login-form-tab";
import { LoginFormTitle } from "./form-parts/login-form-title";
import { useLoginForm } from "./use-login-form";

export const LoginForm = {
  Root: LoginFormRoot,
  Title: LoginFormTitle,
  Description: LoginFormDescription,
  Tab: LoginFormTab,
};

export const FormLoginLayout = () => {
  const { form, onSubmit, errors, handleChangeTab } = useLoginForm();
  const currentTab = form.watch("diffTab");

  console.log(`currentTab: ${currentTab}`);

  return (
    <LoginForm.Root onSubmit={form.handleSubmit(onSubmit)}>
      <LoginForm.Title>
        {currentTab === "login" ? "Entre em sua conta" : "Criar conta"}
      </LoginForm.Title>
      <LoginForm.Description>
        {currentTab === "login"
          ? "Faça login para continuar sua aventura e retomar a criação do seu anel personalizado"
          : "Crie sua conta e embarque na jornada para forjar o anel perfeito."}
      </LoginForm.Description>

      {currentTab === "register" && (
        <>
          <input
            placeholder="Insira seu nome"
            className={`w-full input`}
            {...form.register("name")}
            defaultValue={""}
          />

          {"name" in errors && errors.name && (
            <span className="text-red-500 text-xs">{errors.name.message}</span>
          )}
        </>
      )}

      <input
        type={"email"}
        className={"input w-full"}
        placeholder="Insira seu e-mail"
        {...form.register("email")}
        defaultValue={""}
      />
      {errors.email && (
        <span className="text-red-500 text-xs">{errors.email.message}</span>
      )}

      <input
        placeholder="Insira sua senha"
        type="password"
        className={`w-full input`}
        {...form.register("password")}
      />
      {errors.password && (
        <span className="text-red-500 text-xs">{errors.password.message}</span>
      )}

      <GoldenButton type="submit">
        {currentTab === "login" ? "Entrar" : "Criar conta"}
      </GoldenButton>

      <LoginForm.Tab onClick={() => handleChangeTab(currentTab)}>
        {currentTab === "login" ? "Criar conta" : "Entre em sua conta"}
      </LoginForm.Tab>
    </LoginForm.Root>
  );
};
